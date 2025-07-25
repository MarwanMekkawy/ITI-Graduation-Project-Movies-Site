import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinner } from './loading-spinner/loading-spinner';
import { MovieCard } from "./movie-card/movie-card";
import { CarouselComponent } from "./carousel/carousel";
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { SlideShow } from "./slide-show/slide-show";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    LoadingSpinner, MovieCard, CarouselComponent, OverlayModule, PortalModule, SlideShow],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Project.FrontEnd');
}
