import { Component } from '@angular/core';
import { MovieCard } from "../../child-components/movie-card/movie-card";
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "../../child-components/carousel/carousel";

@Component({
  selector: 'app-watchlist-page',
  imports: [MovieCard, CommonModule],
  templateUrl: './watchlist-page.html',
  styleUrl: './watchlist-page.css'
})
export class WatchlistPage {
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
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    },
     {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    }, {
      title: 'Countdown',
      release: '2025',
      ageRating: '16+',
      description: 'Season 1 • A broad-daylight murder...',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      episodeInfo: 'New episode Wednesday'
    },
    
    // Add more items as needed
  ];
}
