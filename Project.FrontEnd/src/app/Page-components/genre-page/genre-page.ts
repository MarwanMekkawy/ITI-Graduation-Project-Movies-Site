import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreBadge } from '../../child-components/genre-badge/genre-badge';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [CommonModule, GenreBadge],
  templateUrl: './genre-page.html',
  styleUrls: ['./genre-page.css']
})
export class GenrePage {
  genres: string[] = [
     'Comedy','Action and adventure', 'Documentary',
    'Drama', 'Fantasy', 'Horror',
    'Kids', 'Mystery and thrillers',
    'Romance', 'Science fiction'
  ];
}
