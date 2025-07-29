import { Component ,ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBarComponent {
  constructor(public el: ElementRef) {}      //searchbar link with navbar

  query: string = '';
  isFocused: boolean = false;

  dummySuggestions: string[] = [
    'horror movies', 'malayalam movies', 'tamil movies', 'telugu movies',
    'movie', 'mov', 'movies', 'movi', 'movies in hindi'
  ];

  get filteredSuggestions(): string[] {
    const q = this.query.trim().toLowerCase();
    return q
      ? this.dummySuggestions.filter(item => item.toLowerCase().includes(q))
      : [];
  }

  clearSearch() {
    this.query = '';
  }
}
