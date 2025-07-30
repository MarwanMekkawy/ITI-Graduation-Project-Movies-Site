import { Component } from '@angular/core';
import { MovieCard } from "../../child-components/movie-card/movie-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [MovieCard,CommonModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage {
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
    
    
  ];
}
