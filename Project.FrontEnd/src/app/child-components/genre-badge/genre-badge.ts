import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-genre-badge',
  imports: [],
  templateUrl: './genre-badge.html',
  styleUrl: './genre-badge.css'
})
export class GenreBadge {
@Input() genre: string = '';
}
