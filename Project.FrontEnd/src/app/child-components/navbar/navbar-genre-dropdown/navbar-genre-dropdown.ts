import { CommonModule } from '@angular/common';
import { Component ,ElementRef} from '@angular/core';

@Component({
  selector: 'app-navbar-genre-dropdown',
  imports: [CommonModule],
  templateUrl: './navbar-genre-dropdown.html',
  styleUrl: './navbar-genre-dropdown.css'
})
export class NavbarGenreDropdown {
constructor(public el: ElementRef) {}      //dropdown link with navbar

selectedGenre: string = 'Action and adventure';

  genres = [
    'Action and adventure', 'Romance', 'Comedy', 'Science fiction',
    'Documentary', 'Drama', 'Fantasy', 'Horror', 'Kids', 'Mystery and thrillers'
  ];

  selectGenre(genre: string) {
    this.selectedGenre = genre;
  }
}
