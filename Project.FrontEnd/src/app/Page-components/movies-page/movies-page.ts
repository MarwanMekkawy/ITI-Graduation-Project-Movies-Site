import { Component, inject, OnInit } from '@angular/core';
import { CarouselComponent } from "../../child-components/carousel/carousel";
import { MovieGenre } from './../../core/models/movie-genre';
import { CommonModule } from '@angular/common';
import { MoviesService } from './../../core/services/movies-service';
import { GenreService } from './../../core/services/genre-service';
import { Movie } from '../../core/models/movie';
import { ExpandedCarousel } from "../../child-components/expanded-carousel/expanded-carousel";


@Component({
  selector: 'app-movies-page',
  imports: [CarouselComponent, CommonModule, ExpandedCarousel],
  templateUrl: './movies-page.html',
  styleUrl: './movies-page.css'
})
export class MoviesPage {
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
  genreMoviesMap: { [genreId: number]: Movie[] } = {};

  ngOnInit(): void {
    // Core categories
    

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

  

    // Load genres and items per genre
  this.genreService.getAllGenres().subscribe({
  next: (allGenres) => {
    this.genres = allGenres.filter(g => g.genreId !== 3);
    for (const genre of this.genres) {
      this.genreService.getMoviesByGenreId(genre.genreId).subscribe({
        next: (movies) => this.genreMoviesMap[genre.genreId] = movies,
        error: (err) => console.error(`Failed to load genre '${genre.name}':`, err)
      });
    }
  },
  error: (err) => console.error('Failed to load genres:', err)
});
  }
}
