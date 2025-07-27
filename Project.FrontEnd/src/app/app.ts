import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Project.FrontEnd');
}
