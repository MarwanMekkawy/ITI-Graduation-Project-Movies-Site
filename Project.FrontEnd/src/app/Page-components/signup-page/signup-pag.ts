import { Component } from '@angular/core';
import { register } from 'node:module';
import { RegisterForm } from '../../child-components/register-form/register-form';

@Component({
  selector: 'app-signup-page',
  imports: [RegisterForm],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage {}
