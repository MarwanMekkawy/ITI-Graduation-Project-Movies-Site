import { Component, ViewChild, ElementRef ,Input } from '@angular/core';
import { CommonModule } from '@angular/common';            // Required for *ngFor structural directive
import { MovieCard } from '../movie-card/movie-card';      // The movie card component rendered inside the carousel

@Component({
  selector: 'app-carousel',                                // Tag to use in parent HTML
  standalone: true,                                        // No NgModule required
  templateUrl: './carousel.html',                          // Template file
  styleUrl: './carousel.css',                              // Stylesheet
  imports: [CommonModule, MovieCard]                       // Declares usage of ngFor and MovieCard
})
export class CarouselComponent {
    @Input() title: string = '';  // Title passed from parent

  // Access the scrollable div using template reference
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  // List of movie objects shown inside the carousel
  movies = [
    {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    },
    {
      title: 'My Fault: London',
      release: '2024',
      ageRating: '16+',
      description: 'A teenager must navigate a dangerous web...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'Now Streaming'
    },
    // Repeated test items for scrolling
    {
      title: 'Me Before You',
      release: '2016',
      ageRating: '13+',
      description: 'A girl in a small town forms an unlikely bond...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'Available'
    },
     {
      title: 'Me Before You',
      release: '2016',
      ageRating: '13+',
      description: 'A girl in a small town forms an unlikely bond...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'Available'
    },
     {
      title: 'Me Before You',
      release: '2016',
      ageRating: '13+',
      description: 'A girl in a small town forms an unlikely bond...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'Available'
    },
     {
      title: 'Me Before You',
      release: '2016',
      ageRating: '13+',
      description: 'A girl in a small town forms an unlikely bond...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'Available'
    },
     {
      title: 'Me Before You',
      release: '2016',
      ageRating: '13+',
      description: 'A girl in a small town forms an unlikely bond...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'Available'
    },
     {
      title: 'Me Before You',
      release: '2016',
      ageRating: '13+',
      description: 'A girl in a small town forms an unlikely bond...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'Available'
    },
    // Add more items as needed
  ];

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
