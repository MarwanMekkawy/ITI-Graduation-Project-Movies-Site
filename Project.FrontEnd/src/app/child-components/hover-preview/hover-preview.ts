import { Component, Input, Output, EventEmitter, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Movie } from '../../core/models/movie';
import { WatchList } from '../../core/models/watch-list';
import { WatchlistService } from '../../core/services/watchlist-service';
import { ActivatedRoute, Router } from '@angular/router';  // ✅ FIXED import

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

  private userId: any = localStorage.getItem(`user_id`);
  isInWatchlist = false;
  busy = false;

  constructor(private router: Router) {}   // ✅ Angular Router injected here

  ngOnInit(): void {
    this.userId = localStorage.getItem(`user_id`);

    this.watchlistService.getUserWatchlist(this.userId).subscribe({
      next: (watchlist: WatchList[]) => {
        this.isInWatchlist = !!watchlist.find(w => w.movieId === this.movie.movieId);
      },
      error: (err) => console.error('Failed to load watchlist for check:', err)
    });
  }

  @HostListener('mouseenter')
  onOverlayEnter() {
    this.mouseEntered.emit();
  }

  @HostListener('mouseleave')
  onOverlayLeave() {
    this.mouseLeft.emit();
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
        console.log(` Added ${this.movie.title}`);
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
        this.removed.emit(this.movie.movieId);
        console.log(` Removed ${this.movie.title}`);
      },
      error: (err) => {
        console.error('Failed to remove from watchlist:', err);
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

  onBlockClick(): void {
    if (this.isInWatchlist) {
      this.onRemoveClick();
    } else {
      console.log(' Not in watchlist to remove:', this.movie);
    }
  }
}
