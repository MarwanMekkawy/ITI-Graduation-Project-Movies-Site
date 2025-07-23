import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginForm } from './login-form/login-form';
import { RegisterForm } from './register-form/register-form';
import { LoginPageComponent } from './login-page-component/login-page-component';
import { SignupPageComponent } from './signup-page-component/signup-page-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent, SignupPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Project.FrontEnd');
}
