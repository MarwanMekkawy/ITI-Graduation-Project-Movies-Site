import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MovieGenre } from '../models/movie-genre';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = 'http://localhost:5059/api/Genres';

  constructor(private http: HttpClient) {}

  /**
   * Get all genres (id + name only)
   */
 getAllGenres(): Observable<MovieGenre[]> {
  return this.http.get<MovieGenre[]>(this.apiUrl);
}

  /**
   * Get all items (movies + series) by genre ID
   */
  getItemsByGenreId(genreId: number): Observable<Movie[]> {
    return this.http.get<MovieGenre>(`${this.apiUrl}/${genreId}`).pipe(
      map((genre) => genre.movies ?? [])
    );
  }

  /**
   * Get movies only by genre ID
   */
  getMoviesByGenreId(genreId: number): Observable<Movie[]> {
    return this.http.get<MovieGenre>(`${this.apiUrl}/movies/${genreId}`).pipe(
      map((genre) => genre.movies ?? [])
    );
  }

  /**
   * Get series only by genre ID
   */
  getSeriesByGenreId(genreId: number): Observable<Movie[]> {
    return this.http.get<MovieGenre>(`${this.apiUrl}/series/${genreId}`).pipe(
      map((genre) => genre.movies ?? [])
    );
  }
}
