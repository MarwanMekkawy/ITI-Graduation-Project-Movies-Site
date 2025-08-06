// core/services/search-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private apiUrl = 'http://localhost:5059/api/Items';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/search?title=${query}`);
  }
}
