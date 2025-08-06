import { Movie } from '../../core/models/movie';
import { MoviesService } from './../../core/services/movies-service';
import { Component, ViewChild, ElementRef ,Input, inject, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';            // Required for *ngFor structural directive
import { MovieCard } from '../movie-card/movie-card';      // The movie card component rendered inside the carousel

@Component({
  selector: 'app-carousel',                                // Tag to use in parent HTML
  standalone: true,                                        // No NgModule required
  templateUrl: './carousel.html',                          // Template file
  styleUrl: './carousel.css',                              // Stylesheet
  imports: [CommonModule, MovieCard]                       // Declares usage of ngFor and MovieCard
})
export class CarouselComponent  {
    @Input() title: string = '';  // Title passed from parent
    @Input() movies!:Movie[];
 
  // Access the scrollable div using template reference
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  // List of movie objects shown inside the carousel
  

  /**
   * Scrolls the carousel container left or right
   * @param direction 'left' | 'right'
   */
  scroll(direction: 'left' | 'right'): void {
    const container = this.scrollContainer.nativeElement;
    const scrollAmount = 320 + 16; // Width of one card + 1rem gap

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth' // Enables smooth scrolling
    });
  }
}
