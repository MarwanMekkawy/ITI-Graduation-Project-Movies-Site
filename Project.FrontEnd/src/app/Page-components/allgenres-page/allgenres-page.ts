import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenreBadge } from "../../child-components/genre-badge/genre-badge";

@Component({
  selector: 'app-allgenres-page',
  templateUrl: './allgenres-page.html',
  styleUrls: ['./allgenres-page.css'],
  imports: [GenreBadge,CommonModule]
})
export class AllgenresPage {
  genres = [
    { id: 1, name: 'Action and adventure' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Documentary' },
    { id: 4, name: 'Drama' },
    { id: 5, name: 'Fantasy' },
    { id: 6, name: 'Horror' },
    { id: 7, name: 'Kids' },
    { id: 8, name: 'Romance' },
  ];

  constructor(private router: Router) {}

  goToGenre(id: number) {
    // navigate using id param:
    this.router.navigate(['/genres', id], { state: { /* optional extra */ }});
  }
}