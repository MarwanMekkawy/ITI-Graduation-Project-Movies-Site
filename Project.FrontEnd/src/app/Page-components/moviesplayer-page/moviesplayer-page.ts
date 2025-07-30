import { Component } from '@angular/core';
import { VideoPlayer } from "../../child-components/video-player/video-player";
import { CarouselComponent } from "../../child-components/carousel/carousel";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moviesplayer-page',
  imports: [VideoPlayer,CarouselComponent,CommonModule],
  templateUrl: './moviesplayer-page.html',
  styleUrl: './moviesplayer-page.css'
})
export class MoviesplayerPage {
activeTab: string = 'related'; 
}
