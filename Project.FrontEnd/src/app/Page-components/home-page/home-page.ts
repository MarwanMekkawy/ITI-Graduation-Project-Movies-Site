import { MovieGenre } from './../../core/models/movie-genre';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from './../../core/services/movies-service';
import { GenreService } from './../../core/services/genre-service';
import { Movie } from '../../core/models/movie';
import { SlideShow } from "../../child-components/slide-show/slide-show";
import { CarouselComponent } from "../../child-components/carousel/carousel";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, SlideShow, CarouselComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  private readonly moviesService = inject(MoviesService);
  private readonly genreService = inject(GenreService);

  items!: Movie[];
  topRatedItems!: Movie[];
  LatestItems!: Movie[];

  movies!: Movie[];
  topRatedMovies!: Movie[];
  LatestMovies!: Movie[];

  series!: Movie[];
  topRatedSeries!: Movie[];
  LatestSeries!: Movie[];

genres: MovieGenre[] = [];
  genreItemsMap: { [genreId: number]: Movie[] } = {};

  ngOnInit(): void {
    // Core categories
    this.moviesService.getAllItems().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Failed to load items:', err)
    });

    this.moviesService.getTopRatedItems().subscribe({
      next: (data) => this.topRatedItems = data,
      error: (err) => console.error('Failed to load top rated items:', err)
    });

    this.moviesService.getLatestItems().subscribe({
      next: (data) => this.LatestItems = data,
      error: (err) => console.error('Failed to load latest items:', err)
    });

    this.moviesService.getAllMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Failed to load movies:', err)
    });

    this.moviesService.getTopRatedMovies().subscribe({
      next: (data) => this.topRatedMovies = data,
      error: (err) => console.error('Failed to load top rated movies:', err)
    });

    this.moviesService.getLatestMovies().subscribe({
      next: (data) => this.LatestMovies = data,
      error: (err) => console.error('Failed to load latest movies:', err)
    });

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
      this.genreService.getItemsByGenreId(genre.genreId).subscribe({
        next: (items) => this.genreItemsMap[genre.genreId] = items,
        error: (err) => console.error(`Failed to load genre '${genre.name}':`, err)
      });
    }
  },
  error: (err) => console.error('Failed to load genres:', err)
});
  }
}
