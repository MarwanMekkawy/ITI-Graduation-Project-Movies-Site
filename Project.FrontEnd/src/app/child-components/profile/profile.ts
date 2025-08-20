import { DeleteService } from './../../core/services/auth/delete-service';
import { UpdateService } from './../../core/services/auth/update-service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth-service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UpdateRequest } from '../../core/models/update-request';
import { UserService } from '../../core/services/auth/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  //   FORM GROUP (Reactive)
  updateForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.pattern(/^[A-Za-z\d]+$/), Validators.minLength(8), Validators.maxLength(20)]),
    confirmPassword: new FormControl('')
  });

  //   STATE
  user: UpdateRequest | null = null;
  profileImage: string = 'ProfilePlaceholder.jpg';
  editMode = false;
  passwordMatch = true;
  deleteConfirmMode = false;
  error: string[] = [];
  private userId: any = localStorage.getItem(`user_id`);

  //   CONSTRUCTOR (SERVICES)
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private updateService: UpdateService,
    private deleteService: DeleteService,
    private router: Router
  ) { }

  //   LIFECYCLE HOOK
  ngOnInit(): void {
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;

      // Load form data
      this.updateForm.patchValue({
        username: user.username,
        email: user.email
      });

      // Load image
      const img = user.userImage;
      if (img) {
        this.profileImage = img.startsWith('data:image')
          ? img
          : `data:image/jpeg;base64,${img}`;
      } else {
        this.profileImage = '/ProfilePlaceholder.jpg';
      }
    });
  }

  //   IMAGE FALLBACK
  onImgError() {
    this.profileImage = '/ProfilePlaceholder.jpg';
  }

  //   EDIT TOGGLE
  toggleEdit() {
    this.deleteConfirmMode = false;
    this.editMode = !this.editMode;
    if (this.editMode && this.user) {
      this.updateForm.patchValue({
        username: localStorage.getItem(`user_name`) ?? '',
        email: localStorage.getItem(`user_email`) ?? '',
        password: '',
        confirmPassword: ''
      });
    }
  }

  //   FORM SUBMISSION
  registerUpdateForm(): void {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }
    if (!this.user) return;
    const formValues = this.updateForm.value;

    // Password match check
    if (formValues.password !== formValues.confirmPassword) {
      this.passwordMatch = false;
      return;
    }
    this.passwordMatch = true;

    // Apply updates to user object
    this.user.username = formValues.username;
    this.user.email = formValues.email;
    this.user.password = formValues.password || this.user.password || '';

    // Call backend
    this.authService.sendUpdateForm(this.userId, this.user).subscribe(
      {
        next: (res) => {
          if (res.token) {
            this.updateService.tokenprocessing(res.token);
            this.editMode = false;
            this.userService.setUser(this.user!);
            this.error = [];
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error = err.error.errors;
        }
      }
    );
  }

  //   OTHER HANDLERS
  cancelChanges() {
    this.editMode = false;
    this.passwordMatch = true;
  }

  checkPasswords() {
    const { password, confirmPassword } = this.updateForm.value;
    this.passwordMatch = password === confirmPassword;
  }

  promptDelete() { this.deleteConfirmMode = true; }
  cancelPromptDelete() { this.deleteConfirmMode = false; }

  confirmDelete() {
    this.deleteService.DeleteUser(this.userId).subscribe({
      next: () => {
        this.router.navigate(['/welcomepage']);
      },
      error: (err) => {
        console.log(`Delete failed : ${err}`);
      }
    });
  }

  //   GETTERS
  get maskedPassword(): string { return this.user?.password ? '********' : '********'; }
  get createdAt(): string { return this.user?.createdAt ?? ''; }
}
