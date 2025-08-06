import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from './../../core/services/movies-service';
import { Movie } from './../../core/models/movie.interface';
import { SlideShow } from "../../child-components/slide-show/slide-show";
import { CarouselComponent } from "../../child-components/carousel/carousel";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SlideShow, CarouselComponent,CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  private readonly moviesService = inject(MoviesService);

  items!: Movie[];
  topRatedItems!: Movie[];
  LatestItems!: Movie[];

  movies!: Movie[];
  topRatedMovies!: Movie[];
  LatestMovies!: Movie[];

  series!: Movie[];
  topRatedSeries!: Movie[];
  LatestSeries!: Movie[];

  genreMoviesMap: { [key: number]: Movie[] } = {};

  genres = [
    { id: 1, name: 'Action and adventure' },
    { id: 2, name: 'Comedy' },
    { id: 4, name: 'Drama' },
    { id: 5, name: 'Fantasy' },
    { id: 6, name: 'Horror' },
    { id: 7, name: 'Kids' },
    { id: 8, name: 'Romance' }
  ];

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

    // Movies
    this.moviesService.getAllMovies().subscribe({
      next: (data) => this.movies = data,
      error: (err) => console.error('Failed to load all movies:', err)
    });

    this.moviesService.getTopRatedMovies().subscribe({
      next: (data) => this.topRatedMovies = data,
      error: (err) => console.error('Failed to load top rated movies:', err)
    });

    this.moviesService.getLatestMovies().subscribe({
      next: (data) => this.LatestMovies = data,
      error: (err) => console.error('Failed to load latest movies:', err)
    });

    // Series
    this.moviesService.getAllSeries().subscribe({
      next: (data) => this.series = data,
      error: (err) => console.error('Failed to load all series:', err)
    });

    this.moviesService.getTopRatedSeries().subscribe({
      next: (data) => this.topRatedSeries = data,
      error: (err) => console.error('Failed to load top rated series:', err)
    });

    this.moviesService.getLatestSeries().subscribe({
      next: (data) => this.LatestSeries = data,
      error: (err) => console.error('Failed to load latest series:', err)
    });

    // Genre-based sliders (excluding ID 3 = Documentary)
    for (const genre of this.genres) {
      this.moviesService.getItemsByGenreId(genre.id).subscribe({
        next: (data) => this.genreMoviesMap[genre.id] = data,
        error: (err) => console.error(`Failed to load genre ${genre.name}:`, err)
      });
    }
  }
}
