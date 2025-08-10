import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Movie } from '../../core/models/movie';
import { WatchList } from '../../core/models/watch-list';
import { WatchlistService } from '../../core/services/watchlist-service';

@Component({
  selector: 'app-hover-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hover-preview.html',
  styleUrls: ['./hover-preview.css']
})
export class HoverPreview implements OnInit {
  @Input() movie!: Movie;
  @Output() mouseEntered = new EventEmitter<void>();
  @Output() mouseLeft = new EventEmitter<void>();
  @Output() removed = new EventEmitter<number>();

  private readonly watchlistService = inject(WatchlistService);

  // Replace with your actual auth user id
  userId = 8;

  // UI state
  isInWatchlist = false;
  busy = false; // prevents double clicks & disables buttons while API is running

  ngOnInit(): void {
    // Check if this movie is already in the user's watchlist
    this.watchlistService.getUserWatchlist(this.userId).subscribe({
      next: (watchlist: WatchList[]) => {
        this.isInWatchlist = !!watchlist.find(w => w.movieId === this.movie.movieId);
      },
      error: (err) => console.error('Failed to load watchlist for check:', err)
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
    this.watchlistService.addToWatchlist(entry).subscribe({
      next: () => {
        this.isInWatchlist = true;
        this.busy = false;
        console.log(`➕ Added ${this.movie.title}`);
      },
      error: (err) => {
        console.error('Failed to add to watchlist:', err);
        this.busy = false;
      }
    });
  }

  onRemoveClick(): void {
    if (!this.isInWatchlist || this.busy) return;

    this.busy = true;
    this.watchlistService.removeFromWatchlist(this.userId, this.movie.movieId).subscribe({
      next: () => {
        this.isInWatchlist = false;
        this.busy = false;
        this.removed.emit(this.movie.movieId); // notify parent if needed
        console.log(`🗑️ Removed ${this.movie.title}`);
      },
      error: (err) => {
        console.error('Failed to remove from watchlist:', err);
        this.busy = false;
      }
    });
  }

  onWatchClick(): void {
    console.log('▶️ Watch clicked:', this.movie);
  }

  onBlockClick(): void {
    // Kept your legacy handler; it now simply calls the guarded remove
    if (this.isInWatchlist) this.onRemoveClick();
    else console.log('🚫 Not in watchlist to remove:', this.movie);
  }
}
