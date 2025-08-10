import { Movie } from '../../core/models/movie';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
  imports: [CommonModule, MovieCard]
})
export class CarouselComponent {
  @Input() title: string = '';
  @Input() movies!: Movie[];

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef<HTMLDivElement>;

  get hasMovies(): boolean {
    return Array.isArray(this.movies) && this.movies.length > 0;
  }

  scroll(direction: 'left' | 'right'): void {
    const container = this.scrollContainer.nativeElement;
    const scrollAmount = 320 + 16; // card width + gap
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }

  // (optional) better *ngFor performance
  trackByMovieId = (_: number, m: Movie) => m.movieId;
}
