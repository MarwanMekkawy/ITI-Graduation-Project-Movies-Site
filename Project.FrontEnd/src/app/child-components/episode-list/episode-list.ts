import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-list.html',
  styleUrl: './episode-list.css'
})
export class EpisodeList {
  episodes = [
    {
      title: 'S1 E1 - Suits Pilot - Part 1',
      date: 'June 23, 2011',
      duration: '40min',
      rating: '16+',
      image: 'https://m.media-amazon.com/images/M/MV5BZWFkMjk5NGUtNjBlNS00ODU0LThjNDYtMGRiNTE3YjcxZDAyXkEyXkFqcGc@._V1_.jpg',
      desc: 'When Harvey\'s promotion requires him to recruit and hire a graduate of Harvard Law, he chooses Mike Ross. Part 1 of 2.'
    },
    
  ];

  onPlay(episode: any) {
    // TODO: Handle play video logic here
    console.log('Play action:', episode);
  }

  onDownload(episode: any) {
    // TODO: Handle download logic here
    console.log('Download action:', episode);
  }
}
