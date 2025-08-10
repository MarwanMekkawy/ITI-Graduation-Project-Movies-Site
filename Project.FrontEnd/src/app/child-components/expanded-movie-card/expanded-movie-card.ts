import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, EventEmitter, Output, inject } from '@angular/core';

import { Movie } from './../../core/models/movie';
import { WatchList } from '../../core/models/watch-list';
import { WatchlistService } from '../../core/services/watchlist-service';

@Component({
  selector: 'app-expanded-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expanded-movie-card.html',
  styleUrls: ['./expanded-movie-card.css']
})
export class ExpandedMovieCard implements OnInit {
  @Input() movie!: Movie;

  /** Optional sizing & look */
  @Input() width = 220;   // px (applied inline)
  @Input() radius = 14;   // px (applied inline)
  @Input() zoom = 1.06;   // not used directly here, but kept for API parity

  /** Optional: tell parent a removal happened */
  @Output() removed = new EventEmitter<number>();

  private readonly watchlistService = inject(WatchlistService);

  // Replace with real auth user id
  userId = 8;

  // UI state
  isInWatchlist = false;
  busy = false; // prevents double-clicks and disables buttons during API calls

  ngOnInit(): void {
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
        console.log(`➕ Added ${this.movie.title}`);
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
    console.log('▶️ Watch clicked:', this.movie);
  }
}
