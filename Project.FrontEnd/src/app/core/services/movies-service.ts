import { MovieGenre } from './../models/movie-genre.interface';
import { Movie } from './../models/movie.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // Base API URL
  private apiUrl = 'http://localhost:5059/api';

  constructor(private http: HttpClient) {}

  // Get all items (movies + series)
  getAllItems(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/Items`);
  }

  // Get top 30 rated items
  getTopRatedItems(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/Items/top/30`);
  }

  // Get latest 30 added items
  getLatestItems(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/Items/Latest/30`);
  }

  // Get all items (movies/series) by genre ID
  getItemsByGenreId(genreId: number): Observable<Movie[]> {
    return this.http.get<MovieGenre>(`${this.apiUrl}/Genres/${genreId}`).pipe(
      map((genre) => genre.movies ?? []) // safely extract movies or return empty array
    );
  }

  // Get all movies only
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/Items/movies`);
  }

  // Get all series only
  getAllSeries(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/Items/series`);
  }

  //  getTopRatedMovies(): Observable<Movie[]> {
  //   return this.http.get<Movie[]>(this.apiItemsUrl);
  // }

  // getLatestMovies(): Observable<Movie[]> {
  //   return this.http.get<Movie[]>(this.apiItemsUrl);
  // }

  //  getTopRatedSeries(): Observable<Movie[]> {
  //   return this.http.get<Movie[]>(this.apiItemsUrl);
  // }

  // getLatestSeries(): Observable<Movie[]> {
  //   return this.http.get<Movie[]>(this.apiItemsUrl);
  // }
}
