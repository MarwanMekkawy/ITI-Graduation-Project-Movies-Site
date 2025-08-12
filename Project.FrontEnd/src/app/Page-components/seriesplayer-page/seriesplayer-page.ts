import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CarouselComponent } from '../../child-components/carousel/carousel';
import { EpisodeList } from '../../child-components/episode-list/episode-list';
import { VideoPlayer } from '../../child-components/video-player/video-player';
import { MoviesService } from '../../core/services/movies-service';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-seriesplayer-page',
  imports: [VideoPlayer, EpisodeList, CarouselComponent,CommonModule],
  templateUrl: './seriesplayer-page.html',
  styleUrl: './seriesplayer-page.css'
})
export class SeriesplayerPage {
  private readonly moviesService = inject(MoviesService);
 series!: Movie[];
  topRatedSeries!: Movie[];
activeTab: string = 'episodes';
 ngOnInit(): void {
    // Core categories

    this.moviesService.getAllSeries().subscribe({
      next: (data) => this.series = data,
      error: (err) => console.error('Failed to load series:', err)
    });

    this.moviesService.getTopRatedSeries().subscribe({
      next: (data) => this.topRatedSeries = data,
      error: (err) => console.error('Failed to load top rated series:', err)
    });
  }

}
