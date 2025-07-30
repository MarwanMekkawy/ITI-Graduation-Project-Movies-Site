import { Component } from '@angular/core';
import { VideoPlayer } from "../../child-components/video-player/video-player";
import { EpisodeList } from "../../child-components/episode-list/episode-list";
import { CarouselComponent } from "../../child-components/carousel/carousel";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videoplayer-page',
  imports: [VideoPlayer, EpisodeList, CarouselComponent,CommonModule],
  templateUrl: './videoplayer-page.html',
  styleUrl: './videoplayer-page.css'
})
export class VideoplayerPage {
activeTab: string = 'related';
}
