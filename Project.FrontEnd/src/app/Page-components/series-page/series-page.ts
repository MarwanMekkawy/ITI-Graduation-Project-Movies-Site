import { CarouselComponent } from "../../child-components/carousel/carousel";
import { Component, inject, OnInit } from '@angular/core';
import { MovieGenre } from './../../core/models/movie-genre';
import { CommonModule } from '@angular/common';
import { MoviesService } from './../../core/services/movies-service';
import { GenreService } from './../../core/services/genre-service';
import { Movie } from '../../core/models/movie';
import { ExpandedCarousel } from "../../child-components/expanded-carousel/expanded-carousel";

@Component({
  selector: 'app-series-page',
  imports: [CarouselComponent, CommonModule, ExpandedCarousel],
  templateUrl: './series-page.html',
  styleUrl: './series-page.css'
})
export class SeriesPage {
private readonly moviesService = inject(MoviesService);
  private readonly genreService = inject(GenreService);

  

  series!: Movie[];
  topRatedSeries!: Movie[];
  LatestSeries!: Movie[];

genres: MovieGenre[] = [];
  genreSeriesMap: { [genreId: number]: Movie[] } = {};

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

    this.moviesService.getLatestSeries().subscribe({
      next: (data) => this.LatestSeries = data,
      error: (err) => console.error('Failed to load latest series:', err)
    });

    // Load genres and items per genre
    this.genreService.getAllGenres().subscribe({
  next: (allGenres) => {
    this.genres = allGenres.filter(g => g.genreId !== 3);
    for (const genre of this.genres) {
      this.genreService.getSeriesByGenreId(genre.genreId).subscribe({
        next: (items) => this.genreSeriesMap[genre.genreId] = items,
        error: (err) => console.error(`Failed to load genre '${genre.name}':`, err)
      });
    }
  },
  error: (err) => console.error('Failed to load genres:', err)
});
  }
}
