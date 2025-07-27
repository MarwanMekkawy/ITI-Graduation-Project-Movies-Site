import { Component } from '@angular/core';
import { register } from 'node:module';
import { RegisterForm } from '../register-form/register-form';

@Component({
  selector: 'app-signup-page-component',
  imports: [RegisterForm],
  templateUrl: './signup-page-component.html',
  styleUrl: './signup-page-component.css',
})
export class SignupPageComponent {}
