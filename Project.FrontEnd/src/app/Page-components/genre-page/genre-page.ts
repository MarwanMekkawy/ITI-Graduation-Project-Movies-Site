import { MovieGenre } from './../../core/models/movie-genre';
import { Movie } from './../../core/models/movie';
import { GenreService } from './../../core/services/genre-service';
import { MoviesService } from './../../core/services/movies-service';
import { Component, inject, OnInit } from '@angular/core';
import { MovieCard } from "../../child-components/movie-card/movie-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [MovieCard, CommonModule,CommonModule],
  templateUrl: './genre-page.html',
  styleUrls: ['./genre-page.css']
})
export class GenrePage implements OnInit{
 private readonly genreService = inject(GenreService);

  genreId = 1; // ← change this for the target genre
  genreName = '';
  movies: Movie[] = [];

  ngOnInit(): void {
    this.genreService.getMoviesByGenreId(this.genreId).subscribe({
      next: (genre) => {
        this.movies = genre;
        this.genreService.getAllGenres().subscribe(res => {
          const match = res.find(g => g.genreId === this.genreId);
          this.genreName = match?.name ?? 'Unknown Genre';
        });
      },
      error: (err) => console.error(`❌ Failed to load genre ${this.genreId}:`, err)
    });
  }
}
