import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {

  //reactive form
  register: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z\d]+$/), Validators.minLength(8), Validators.maxLength(20)]),
  });

  //backend req
  private readonly authService = inject(AuthService);
  private readonly redirect = inject(Router);
  error: string[] = [];
  
  registerTheForm(): void {
    if (this.register.invalid) {           //applies validation
      this.register.markAllAsTouched();
      return;
    }

    this.authService.sendRegisterForm(this.register.value).subscribe({
      next: (res) => {
        if (res.token) {
          this.redirect.navigate([`/login`]);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error.errors;
      }
    })
  }
}
