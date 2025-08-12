import { Component, inject } from '@angular/core';
import { VideoPlayer } from '../../child-components/video-player/video-player';
import { CarouselComponent } from '../../child-components/carousel/carousel';
import { MoviesService } from '../../core/services/movies-service';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-moviesplayer-page',
  imports: [VideoPlayer, CarouselComponent],
  templateUrl: './moviesplayer-page.html',
  styleUrl: './moviesplayer-page.css',
})
export class MoviesplayerPage {
  private readonly moviesService = inject(MoviesService);
  movies!: Movie[];
  topRatedMovies!: Movie[];

  activeTab: string = 'related';
  ngOnInit(): void {
    // Core categories

    this.moviesService.getAllMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (err) => console.error('Failed to load movies:', err),
    });

    this.moviesService.getTopRatedMovies().subscribe({
      next: (data) => (this.topRatedMovies = data),
      error: (err) => console.error('Failed to load top rated movies:', err),
    });
  }
}
