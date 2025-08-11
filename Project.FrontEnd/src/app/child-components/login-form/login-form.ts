import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth/auth-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/services/auth/login-service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  login: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  })


  private readonly loginservice = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly redirect = inject(Router);
  error: string = '';

  registerTheForm(): void { 
    if (this.login.invalid) {           //applies validation
      this.login.markAllAsTouched();
      return;
    }

    this.authService.sendLoginForm(this.login.value).subscribe({
      next: (res) => {
        if (res.token) {
          this.loginservice.tokenprocessing(res.token);
          this.redirect.navigate([`/home`]);
        } 
      },
      error: (err: HttpErrorResponse) => {
        this.error = err.error.errors;
      }
    }) 
  }
}
