import { WatchList } from './../models/watch-list';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private apiUrl = 'http://localhost:5059/api/Watchlist';

  constructor(private http: HttpClient) {}

  // Get all watchlist entries for a specific user (returns movieIds)
  getUserWatchlist(userId: number): Observable<WatchList[]> {
    return this.http.get<WatchList[]>(`${this.apiUrl}/${userId}`);
  }

  // Add a movie to the user's watchlist
  addToWatchlist(entry: WatchList): Observable<void> {
    return this.http.post<void>(this.apiUrl, entry);
  }


  
  // Remove a movie from the user's watchlist
  removeFromWatchlist(userId: number, movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/${movieId}`);
  }
}
