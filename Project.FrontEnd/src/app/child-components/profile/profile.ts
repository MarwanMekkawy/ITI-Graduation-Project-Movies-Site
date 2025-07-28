import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  profileImage = 'https://via.placeholder.com/150'; // Replace with actual default image URL
  username = 'JohnDoe';
  email = 'john@example.com';
  password = 'mySecurePassword123';
  createdAt = '2023-01-01';

  editMode = false;
  newUsername = '';
  newEmail = '';
  newPassword = '';
  confirmPassword = '';
  passwordMatch = true;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.newUsername = this.username;
      this.newEmail = this.email;
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  saveChanges() {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMatch = false;
      return;
    }
    this.passwordMatch = true;
    this.username = this.newUsername;
    this.email = this.newEmail;
    if (this.newPassword) this.password = '********';
    this.editMode = false;
  }

  cancelChanges() {
    this.editMode = false;
    this.passwordMatch = true;
  }

  checkPasswords() {
    this.passwordMatch = this.newPassword === this.confirmPassword;
  }
}
