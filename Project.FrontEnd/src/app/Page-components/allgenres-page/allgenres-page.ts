import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreBadge } from '../../child-components/genre-badge/genre-badge';

@Component({
  selector: 'app-allgenres-page',
  imports: [CommonModule, GenreBadge],
  templateUrl: './allgenres-page.html',
  styleUrl: './allgenres-page.css'
})
export class AllgenresPage {
  genres: string[] = [
    'Comedy', 'Action and adventure', 'Documentary',
    'Drama', 'Fantasy', 'Horror',
    'Kids', 'Mystery and thrillers',
    'Romance', 'Science fiction'
  ];
}
