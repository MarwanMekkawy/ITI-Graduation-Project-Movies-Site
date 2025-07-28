import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselComponent } from "./child-components/carousel/carousel";
import { VideoPlayer } from "./child-components/video-player/video-player";
import { HomePage } from "./Page-components/home-page/home-page";
import { WatchlistPage } from "./Page-components/watchlist-page/watchlist-page";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarouselComponent, VideoPlayer, HomePage, WatchlistPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Project.FrontEnd');
}
