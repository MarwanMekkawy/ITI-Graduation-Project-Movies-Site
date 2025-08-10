import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Movie } from '../../core/models/movie';
import { ExpandedMovieCard } from '../expanded-movie-card/expanded-movie-card';

@Component({
  selector: 'app-expanded-carousel',
  standalone: true,
  imports: [CommonModule, ExpandedMovieCard],
  templateUrl: './expanded-carousel.html',
  styleUrls: ['./expanded-carousel.css']
})
export class ExpandedCarousel implements AfterViewInit {
  @Input() title = '';
  @Input() movies: Movie[] = [];

  @ViewChild('scrollContainer', { static: false })
  scrollContainer?: ElementRef<HTMLDivElement>;

  canLeft = false;
  canRight = true;

  get hasMovies(): boolean {
    return Array.isArray(this.movies) && this.movies.length > 0;
  }

  ngAfterViewInit(): void {
    // Guard: when *ngIf hides the DOM, scrollContainer is undefined
    this.updateArrows();
  }

  @HostListener('window:resize')
  onResize() { this.updateArrows(); }

  scroll(dir: 'left' | 'right') {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;
    const first = el.querySelector('.card-wrapper') as HTMLElement | null;
    const amount = first ? first.offsetWidth + 12 /* gap */ : 320;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    setTimeout(() => this.updateArrows(), 350);
  }

  onScrolled() { this.updateArrows(); }

  private updateArrows(): void {
    const el = this.scrollContainer?.nativeElement;
    if (!el) { this.canLeft = this.canRight = false; return; }
    const eps = 2;
    this.canLeft  = el.scrollLeft > eps;
    this.canRight = el.scrollLeft + el.clientWidth < el.scrollWidth - eps;
  }

  // (optional) better ngFor perf
  trackByMovieId = (_: number, m: Movie) => m.movieId;
}
