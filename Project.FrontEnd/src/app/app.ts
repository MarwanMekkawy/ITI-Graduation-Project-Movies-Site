import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { LoginPageComponent } from './Page-components/login-page/login-page';
// import { SignupPageComponent } from './Page-components/signup-page/signup-pag';
import { ErrorPage } from './Page-components/error-page/error-page';
import { WelcomePage } from './Page-components/welcome-page/welcome-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomePage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Project.FrontEnd');
}
