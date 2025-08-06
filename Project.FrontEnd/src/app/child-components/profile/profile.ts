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

  profileImage = '/ProfilePlaceholder.jpg'; 
  username = 'JohnDoe';
  email = 'john@example.com';
  password = '**************';
  createdAt = '2023-01-01';

  editMode = false;
  newUsername = '';
  newEmail = '';
  newPassword = '';
  confirmPassword = '';
  passwordMatch = true;

  // CHANGED: new state to show inline delete-confirmation
  deleteConfirmMode = false;

  triggerFileInput() {
    // CHANGED: safer optional chaining to avoid runtime error if ViewChild not ready
    this.fileInput?.nativeElement?.click();
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
    // CHANGED: entering edit mode should cancel any delete prompt
    this.deleteConfirmMode = false;

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

  // CHANGED: triggered when user clicks the Delete Account button
  promptDelete() {
    this.deleteConfirmMode = true;
  }

  // CHANGED: cancel the in-place delete prompt
  cancelPromptDelete() {
    this.deleteConfirmMode = false;
  }

  // CHANGED: final delete action (hook this to your backend)
  confirmDelete() {
    // TODO: replace with actual delete API call
    console.log('User confirmed deletion — call backend API and then logout/redirect.');

    // After deletion (or simulated):
    this.deleteConfirmMode = false;
    // Optionally redirect or clear user state:
    // this.router.navigate(['/welcome']);
  }
}
