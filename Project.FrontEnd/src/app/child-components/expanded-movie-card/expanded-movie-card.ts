import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, EventEmitter, Output, inject } from '@angular/core';

import { Movie } from './../../core/models/movie';
import { WatchList } from '../../core/models/watch-list';
import { WatchlistService } from '../../core/services/watchlist-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expanded-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expanded-movie-card.html',
  styleUrls: ['./expanded-movie-card.css']
})
export class ExpandedMovieCard implements OnInit {
    constructor(private router: Router) {}   

  @Input() movie!: Movie;

  /** Optional sizing & look */
  @Input() width = 220;   
  @Input() radius = 14;   
  @Input() zoom = 1.06;   

  /** Optional: tell parent a removal happened */
  @Output() removed = new EventEmitter<number>();

  private readonly watchlistService = inject(WatchlistService);

  // Replace with real auth user id
   private userId: any = localStorage.getItem(`user_id`); 


  // UI state
  isInWatchlist = false;
  busy = false; 

  ngOnInit(): void {
      this.userId = localStorage.getItem(`user_id`);
    this.watchlistService.getUserWatchlist(this.userId).subscribe({
      next: (list: WatchList[]) => {
        this.isInWatchlist = !!list.find(x => x.movieId === this.movie.movieId);
      },
      error: (err) => console.error('Failed to load watchlist:', err)
    });
  }

  onAddClick(): void {
    if (this.isInWatchlist || this.busy) return;

    const entry: WatchList = {
      userId: this.userId,
      movieId: this.movie.movieId,
      addedAt: new Date().toISOString()
    };

    this.busy = true;
    // optimistic UI
    this.isInWatchlist = true;

    this.watchlistService.addToWatchlist(entry).subscribe({
      next: () => {
        this.busy = false;
        console.log(` Added ${this.movie.title}`);
      },
      error: (err) => {
        console.error('Failed to add to watchlist:', err);
        // rollback
        this.isInWatchlist = false;
        this.busy = false;
      }
    });
  }

  onRemoveClick(): void {
    if (!this.isInWatchlist || this.busy) return;

    this.busy = true;
    // optimistic UI
    this.isInWatchlist = false;

    this.watchlistService.removeFromWatchlist(this.userId, this.movie.movieId).subscribe({
      next: () => {
        this.busy = false;
        this.removed.emit(this.movie.movieId);
        console.log(`🗑️ Removed ${this.movie.title}`);
      },
      error: (err) => {
        console.error('Failed to remove from watchlist:', err);
        // rollback
        this.isInWatchlist = true;
        this.busy = false;
      }
    });
  }

   onWatchClick(): void {
  const isSeries = Array.isArray(this.movie.episodes);

  if (isSeries) {
    this.router.navigate(['/series/player', this.movie.movieId]);
  } else {
    this.router.navigate(['/movies/player', this.movie.movieId]);
  }
}
}
