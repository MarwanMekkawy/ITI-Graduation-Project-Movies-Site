import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from "./Page-components/login-page/login-page";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Project.FrontEnd');
}
