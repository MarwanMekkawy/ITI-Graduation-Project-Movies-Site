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
  profileImage: string = 'ProfilePlaceholder.jpg';

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

      const img = user.userImage;
      if (img) {
        // Ensure proper prefix if backend returns raw base64
        this.profileImage = img.startsWith('data:image')
          ? img
          : `data:image/jpeg;base64,${img}`;
      } else {
        this.profileImage = 'assets/ProfilePlaceholder.jpg';
      }
    });
  }

  /** Only allow changing the photo when editMode is true */
  onPicClick(ev: MouseEvent) {
    if (!this.editMode) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.triggerFileInput();
  }

  triggerFileInput() {
    this.fileInput?.nativeElement?.click();
  }

  /** Fallback to placeholder if the image fails to load */
  onImgError() {
    this.profileImage = 'ProfilePlaceholder.jpg';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const originalBase64 = e.target.result as string;
      // Compress to keep payload light
      this.imageCompress.compressFile(originalBase64, -1, 30, 30).then(compressed => {
        this.profileImage = compressed;            // preview
        if (this.user) this.user.userImage = compressed; // persist to model
      });
    };
    reader.readAsDataURL(file);
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
    this.user.password = this.newPassword || this.user.password || '';

    this.userService.updateUser(this.userId, this.user).subscribe(() => {
      this.editMode = false;
      // Notify other parts of the app
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

  promptDelete() { this.deleteConfirmMode = true; }
  cancelPromptDelete() { this.deleteConfirmMode = false; }
  confirmDelete() {
    console.log('User confirmed deletion — call backend and then logout/redirect.');
    this.deleteConfirmMode = false;
  }

  get maskedPassword(): string { return this.user?.password ? '********' : '********'; }
  get createdAt(): string { return this.user?.createdAt ?? ''; }
}
