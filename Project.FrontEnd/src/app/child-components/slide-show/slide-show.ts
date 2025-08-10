import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';

import { WatchlistService } from '../../core/services/watchlist-service';
import { WatchList } from '../../core/models/watch-list';
// If you already have a Movie model, import it. Otherwise use this shape:
export interface Movie {
  movieId: number;
  title: string;
  description: string;
  image: string;
  video: string;
}

@Component({
  selector: 'app-slide-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-show.html',
  styleUrls: ['./slide-show.css'],
})
export class SlideShow implements OnInit, AfterViewInit, OnDestroy {
  // timings (tweak to taste)
  readonly startDelayMs = 500;  // hover delay before video starts
  readonly leaveGraceMs = 1000; // keep playing after mouse leaves
  readonly fadeMs = 350;        // CSS fade time for video

  muted = true;

  // 💾 Auth user (replace with real auth)
  userId = 8;

  // ✅ Watchlist state (fast lookups + per-movie busy flags)
  private readonly watchlistService = inject(WatchlistService);
  private watchIds = new Set<number>();
  private busyIds = new Set<number>();

  // Slides (use movieId for service compatibility)
  movies: Movie[] = [
    {
      movieId: 16,
      title: 'Jurassic World: Rebirth',
      description:
        'Five years after Dominion, an expedition ventures into equatorial isolation to extract ancient DNA for a medical breakthrough.',
      image: 'temp.png',     // or 'assets/images/temp.png'
      video: 'temp.mp4',     // or 'assets/videos/temp.mp4'
    },
    {
      movieId: 32,
      title: 'Heads of State',
      description:
        'The UK Prime Minister and US President must set aside rivalry to thwart a global conspiracy.',
      image: 'temp2.jpg',
      video: 'temp2.mp4',
    },
  ];

  // template refs
  @ViewChild('carousel', { static: true }) carouselRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('vid') videoRefs!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChildren('slide') slideRefs!: QueryList<ElementRef<HTMLDivElement>>;

  // per-slide video state
  hovering: boolean[] = [];
  previewing: boolean[] = [];
  private startTimers = new Map<number, any>();
  private stopTimers = new Map<number, any>();
  private io?: IntersectionObserver;

  /* ---------------------------
     INIT: seed watchlist state
     --------------------------- */
  ngOnInit(): void {
    this.watchlistService.getUserWatchlist(this.userId).subscribe({
      next: (list: WatchList[]) => {
        this.watchIds.clear();
        list.forEach((item) => this.watchIds.add(item.movieId));
      },
      error: (err) => console.error('Failed to load watchlist:', err),
    });
  }

  /* ---------------------------------
     Bootstrap + IntersectionObserver
     --------------------------------- */
  ngAfterViewInit(): void {
    this.io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === this.carouselRef.nativeElement) {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.35) {
              this.stopAll(true); // stop previews when scrolled away
            }
          }
        });
      },
      { threshold: [0, 0.25, 0.35, 0.5, 0.75, 1] }
    );
    this.io.observe(this.carouselRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.stopAll(true);
    this.io?.disconnect();
  }

  /* ---------------------------
     Watchlist helpers + actions
     --------------------------- */
  inWatchlist = (movieId: number) => this.watchIds.has(movieId);
  isBusy = (movieId: number) => this.busyIds.has(movieId);

  onAddClick(movie: Movie): void {
    if (this.inWatchlist(movie.movieId) || this.isBusy(movie.movieId)) return;
    const entry: WatchList = {
      userId: this.userId,
      movieId: movie.movieId,
      addedAt: new Date().toISOString(),
    };

    // optimistic UI
    this.busyIds.add(movie.movieId);
    this.watchIds.add(movie.movieId);

    this.watchlistService.addToWatchlist(entry).subscribe({
      next: () => {
        this.busyIds.delete(movie.movieId);
        // success: nothing else to do
        console.log(`➕ Added ${movie.title}`);
      },
      error: (err) => {
        console.error('Failed to add to watchlist:', err);
        // rollback
        this.busyIds.delete(movie.movieId);
        this.watchIds.delete(movie.movieId);
      },
    });
  }

  onRemoveClick(movie: Movie): void {
    if (!this.inWatchlist(movie.movieId) || this.isBusy(movie.movieId)) return;

    // optimistic UI
    this.busyIds.add(movie.movieId);
    this.watchIds.delete(movie.movieId);

    this.watchlistService.removeFromWatchlist(this.userId, movie.movieId).subscribe({
      next: () => {
        this.busyIds.delete(movie.movieId);
        console.log(`🗑️ Removed ${movie.title}`);
      },
      error: (err) => {
        console.error('Failed to remove from watchlist:', err);
        // rollback
        this.busyIds.delete(movie.movieId);
        this.watchIds.add(movie.movieId);
      },
    });
  }

  onWatchClick(movie: Movie): void {
    console.log('▶️ Watch clicked:', movie);
    // navigate/play as you wish
  }

  /* ---------------------------
     Hover / preview orchestration
     --------------------------- */
  queuePreview(i: number) {
    this.hovering[i] = true;
    this.clearStop(i);
    if (this.previewing[i]) return;

    this.clearStart(i);
    const t = setTimeout(() => {
      if (this.hovering[i]) this.startPreview(i);
    }, this.startDelayMs);
    this.startTimers.set(i, t);
  }

  queueStop(i: number) {
    this.hovering[i] = false;
    this.clearStart(i);
    if (!this.previewing[i]) return;

    this.clearStop(i);
    const t = setTimeout(() => this.stopPreview(i), this.leaveGraceMs);
    this.stopTimers.set(i, t);
  }

  private startPreview(i: number) {
    const vid = this.videoAt(i);
    if (!vid) return;
    this.previewing[i] = true;
    vid.muted = this.muted;
    vid.currentTime = 0;
    vid.play().catch(() => {});
  }

  private stopPreview(i: number, immediate = false) {
    const vid = this.videoAt(i);
    if (!vid) return;

    this.previewing[i] = false;
    const stop = () => {
      try { vid.pause(); } catch {}
      vid.currentTime = 0;
    };

    if (immediate) stop();
    else setTimeout(stop, this.fadeMs);
  }

  onEnded(i: number) {
    this.stopPreview(i);
  }

  // Scroll-away safety
  private stopAll(immediate = false) {
    this.hovering = [];
    this.previewing = [...this.previewing].map(() => false);
    this.startTimers.forEach(clearTimeout);
    this.stopTimers.forEach(clearTimeout);
    this.startTimers.clear();
    this.stopTimers.clear();

    this.videoRefs?.forEach((ref) => {
      const v = ref.nativeElement;
      try { v.pause(); } catch {}
      if (immediate) v.currentTime = 0;
    });
  }

  // Helpers
  private videoAt(i: number): HTMLVideoElement | null {
    const arr = this.videoRefs?.toArray() ?? [];
    return arr[i]?.nativeElement ?? null;
  }
  private clearStart(i: number) {
    const t = this.startTimers.get(i);
    if (t) clearTimeout(t);
    this.startTimers.delete(i);
  }
  private clearStop(i: number) {
    const t = this.stopTimers.get(i);
    if (t) clearTimeout(t);
    this.stopTimers.delete(i);
  }

  // Mute toggle
  toggleMute(video: HTMLVideoElement | null) {
    this.muted = !this.muted;
    if (video) {
      video.muted = this.muted;
      video.volume = this.muted ? 0 : 1;
    }
  }
}
