import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {

  register: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z\d]+$/), Validators.minLength(8), Validators.maxLength(20)]),
  });
  registerTheForm(): void {
    console.log(this.register)
  }
}
