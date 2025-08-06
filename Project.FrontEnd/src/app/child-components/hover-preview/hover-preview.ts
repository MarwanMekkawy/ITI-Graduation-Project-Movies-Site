import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { Movie } from '../../core/models/movie';
import { WatchlistService } from '../../core/services/watchlist-service';
import { WatchList } from '../../core/models/watch-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hover-preview',
  standalone: true,
  templateUrl: './hover-preview.html',
  styleUrls: ['./hover-preview.css'],
  imports: [CommonModule]
})
export class HoverPreview implements OnInit {
  @Input() movie!: Movie;
  @Output() mouseEntered = new EventEmitter<void>();
  @Output() mouseLeft = new EventEmitter<void>();
  @Output() removed = new EventEmitter<number>();


  private readonly watchlistService = inject(WatchlistService);
  userId = 8; // Replace with actual auth user ID

  isInWatchlist = false;

  ngOnInit(): void {
    // Check if the movie is already in the watchlist
    this.watchlistService.getUserWatchlist(this.userId).subscribe({
      next: (watchlist: WatchList[]) => {
        this.isInWatchlist = watchlist.some(item => item.movieId === this.movie.movieId);
      },
      error: (err) => console.error('Failed to load watchlist for check:', err)
    });
  }

  onAddClick(): void {
    const entry: WatchList = {
      userId: this.userId,
      movieId: this.movie.movieId,
      addedAt: new Date().toISOString()
    };

    this.watchlistService.addToWatchlist(entry).subscribe({
      next: () => {
        console.log(`➕ Added ${this.movie.title}`);
        this.isInWatchlist = true;
      },
      error: (err) => console.error('Failed to add to watchlist:', err)
    });
  }

 onRemoveClick(): void {
  this.watchlistService.removeFromWatchlist(this.userId, this.movie.movieId).subscribe({
    next: () => {
      console.log(`🗑️ Removed ${this.movie.title}`);
      this.isInWatchlist = false;
      this.removed.emit(this.movie.movieId); // ✅ emit to parent
    },
    error: (err) => console.error('Failed to remove from watchlist:', err)
  });
}


  onWatchClick(): void {
    console.log('▶️ Watch clicked:', this.movie);
  }

  onBlockClick(): void {
  if (this.isInWatchlist) {
    this.onRemoveClick();
  } else {
    console.log('🚫 Not in watchlist to remove:', this.movie);
  }
}
}
