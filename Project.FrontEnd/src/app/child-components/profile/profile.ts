import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from './../../core/models/user';
import { UserService } from './../../core/services/user-service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  user: User | null = null;
  profileImage: string = '/ProfilePlaceholder.jpg';

  editMode = false;
  newUsername = '';
  newEmail = '';
  newPassword = '';
  confirmPassword = '';
  passwordMatch = true;
  deleteConfirmMode = false;

  private userId = 14;

  constructor(
    private userService: UserService,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;

      // Ensure the image includes proper prefix
      if (user.userImage && !user.userImage.startsWith('data:image')) {
        this.profileImage = `data:image/jpeg;base64,${user.userImage}`;
      } else {
        this.profileImage = user.userImage || '/ProfilePlaceholder.jpg';
      }
    });
  }

  triggerFileInput() {
    this.fileInput?.nativeElement?.click();
  }

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const originalBase64 = e.target.result;

      // Compress image to reduce base64 size (prevents 431 errors)
      this.imageCompress.compressFile(originalBase64, -1, 30, 30).then(compressed => {
        this.profileImage = compressed; // show preview
        if (this.user) this.user.userImage = compressed; // send to backend
      });
    };

    reader.readAsDataURL(file);
  }
}

  toggleEdit() {
    this.deleteConfirmMode = false;
    this.editMode = !this.editMode;
    if (this.editMode && this.user) {
      this.newUsername = this.user.username;
      this.newEmail = this.user.email;
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  saveChanges() {
    if (!this.user) return;

    if (this.newPassword !== this.confirmPassword) {
      this.passwordMatch = false;
      return;
    }

    this.passwordMatch = true;

    this.user.username = this.newUsername;
    this.user.email = this.newEmail;
    this.user.password = this.newPassword || 'defaultPassword123';

   this.userService.updateUser(this.userId, this.user).subscribe(() => {
  this.editMode = false;
  
  // 🔥 Notify other components (like navbar)
  this.userService.setUser(this.user!);
});
  }

  cancelChanges() {
    this.editMode = false;
    this.passwordMatch = true;
  }

  checkPasswords() {
    this.passwordMatch = this.newPassword === this.confirmPassword;
  }

  promptDelete() {
    this.deleteConfirmMode = true;
  }

  cancelPromptDelete() {
    this.deleteConfirmMode = false;
  }

  confirmDelete() {
    console.log('User confirmed deletion — call backend API and then logout/redirect.');
    this.deleteConfirmMode = false;
  }

  get maskedPassword(): string {
    return this.user?.password ? '********' : '';
  }

  get createdAt(): string {
    return this.user?.createdAt ?? '';
  }
}
