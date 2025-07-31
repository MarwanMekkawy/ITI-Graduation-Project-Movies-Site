import { Component } from '@angular/core';
import { MovieCard } from "../../child-components/movie-card/movie-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [MovieCard, CommonModule],
  templateUrl: './genre-page.html',
  styleUrls: ['./genre-page.css']
})
export class GenrePage {
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
    },]
}
