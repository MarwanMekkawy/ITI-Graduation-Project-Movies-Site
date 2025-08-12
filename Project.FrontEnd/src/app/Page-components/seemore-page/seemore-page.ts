import { Component, OnInit } from '@angular/core';
import { Movie } from '../../core/models/movie';
import { MovieCard } from "../../child-components/movie-card/movie-card";

@Component({
  selector: 'app-seemore-page',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './seemore-page.html',
  styleUrl: './seemore-page.css'
})
export class SeemorePage implements OnInit {
  movies: Movie[] = [];
  title = 'More';

  ngOnInit(): void {
    const state = history.state as { movies?: Movie[]; title?: string };
    if (Array.isArray(state?.movies) && state.movies.length) {
      this.movies = state.movies;
      this.title = state.title ?? this.title;
    } else {
      // Optional: handle direct access/refresh (fetch a default list or navigate away)
      // e.g. this.title = 'All Movies';
    }
  }

  trackById = (_: number, m: Movie) => m.movieId;
}
