import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-show.html',
  styleUrl: './slide-show.css'
})
export class SlideShow {
  movies = [
    {
      title: 'CountDown',
      description: 'The British PThe British Prime Minister and US President must set aside their rivalry to thwart a global threatThe British Prime Minister and US President must set aside their rivalry to thwart a global threatrime Minister and US President must set aside their rivalry to thwart a global threat.',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      video: 'https://files.catbox.moe/9z4rzo.mp4'
    },
    {
      title: 'Shadow Ops',
      description: 'An elite squad uncovers a conspiracy deep within their own government.',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      video: 'https://files.catbox.moe/9z4rzo.mp4'
    },
    {
      title: 'Escape Velocity',
      description: 'In a race against time, a pilot must choose between family and duty.',
      image: 'https://i.ibb.co/C5kJZrYQ/Countdown.jpg',
      video: 'https://files.catbox.moe/9z4rzo.mp4'
    }
  ];

  onVideoEvent(event: Event, action: 'play' | 'pause') {
    const video = event.target as HTMLVideoElement | null;
    if (video) {
      if (action === 'play') {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }
}
