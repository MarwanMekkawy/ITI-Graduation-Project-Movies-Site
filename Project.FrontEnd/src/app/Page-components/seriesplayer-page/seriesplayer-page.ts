import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselComponent } from '../../child-components/carousel/carousel';
import { EpisodeList } from '../../child-components/episode-list/episode-list';
import { VideoPlayer } from '../../child-components/video-player/video-player';

@Component({
  selector: 'app-seriesplayer-page',
  imports: [VideoPlayer, EpisodeList, CarouselComponent,CommonModule],
  templateUrl: './seriesplayer-page.html',
  styleUrl: './seriesplayer-page.css'
})
export class SeriesplayerPage {
activeTab: string = 'episodes';
}
