import { Component } from '@angular/core';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [],
  templateUrl: './episode-list.html',
  styleUrl: './episode-list.css'
})
export class EpisodeList {
  episodes = [
  {
    title: 'S1 E1',
    date: 'June 18, 2011',
    duration: '40min',
    rating: '16+',
    image: 'e1.jpg',
    desc: 'A shocking tragedy shakes the nation when a passenger spacecraft suffers a catastrophic failure. Experts begin piecing together the final moments in a race against time to uncover the truth.'
  },
  {
    title: 'S1 E2',
    date: 'June 23, 2011',
    duration: '40min',
    rating: '16+',
    image: 'e2.jpg',
    desc: 'Investigators turn to engineering data and flight communications, retracing the countdown second by second to reveal overlooked warning signs that may have doomed the mission.'
  },
  {
    title: 'S1 E3',
    date: 'June 30, 2011',
    duration: '40min',
    rating: '16+',
    image: 'e3.jpg',
    desc: 'As families of the victims demand answers, scientists and officials clash over responsibility. The search for accountability pushes the investigation into unexpected and controversial territory.'
  }
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
