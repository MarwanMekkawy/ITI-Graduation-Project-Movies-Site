import { WatchlistService } from './../../core/services/watchlist-service';
import { Component, OnInit, inject } from '@angular/core';
import { MovieCard } from "../../child-components/movie-card/movie-card";
import { MoviesService } from '../../core/services/movies-service';
import { Movie } from '../../core/models/movie';
import { WatchList } from '../../core/models/watch-list';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [ MovieCard],
  templateUrl: './watchlist-page.html',
  styleUrl: './watchlist-page.css'
})
export class WatchlistPage implements OnInit {
  private readonly watchlistService = inject(WatchlistService);
  private readonly moviesService = inject(MoviesService);

  movies: Movie[] = [];
    private userId: any = localStorage.getItem(`user_id`); ////////////////////////////////////////////////////////ssr problem
 // Replace with actual user ID

  ngOnInit(): void {
    this.loadWatchlist();
    this.userId = localStorage.getItem(`user_id`);
  }

  loadWatchlist(): void {
    this.watchlistService.getUserWatchlist(this.userId).subscribe({
      next: (watchlist: WatchList[]) => {
        for (const entry of watchlist) {
          this.moviesService.getItemById(entry.movieId).subscribe({
            next: (movie) => {
              this.movies.push(movie); // ✅ Fixed: single Movie, not spread
            },
            error: (err) => console.error(`Failed to load movie ID ${entry.movieId}:`, err)
          });
        }
      },
      error: (err) => console.error('Failed to load watchlist:', err)
    });
  }

  removeFromWatchlist(movieId: number): void {
    this.watchlistService.removeFromWatchlist(this.userId, movieId).subscribe({
      next: () => {
        this.movies = this.movies.filter(m => m.movieId !== movieId);
      },
      error: (err) => console.error(`Failed to remove movie ${movieId}:`, err)
    });
  }
}