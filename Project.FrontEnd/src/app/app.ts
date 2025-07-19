import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Angular core
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,


  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('Project.FrontEnd');
}