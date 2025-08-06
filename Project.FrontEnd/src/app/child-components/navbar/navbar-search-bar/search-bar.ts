import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Movie } from '../../../core/models/movie';
import { SearchService } from '../../../core/services/search-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBarComponent {
  constructor(
    public el: ElementRef,
    private searchService: SearchService,
    private router: Router
  ) {}

  query: string = '';
  isFocused: boolean = false;
  results: Movie[] = [];

  private searchTerms = new Subject<string>();

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchService.searchMovies(term))
    ).subscribe({
      next: (movies) => this.results = movies,
      error: (err) => console.error('Search error:', err)
    });
  }

  onSearchChange(): void {
    const q = this.query.trim();
    if (q.length > 1) {
      this.searchTerms.next(q);
    } else {
      this.results = [];
    }
  }

  clearSearch(): void {
    this.query = '';
    this.results = [];
  }

  search(): void {
    const q = this.query.trim();
    if (q) {
      this.router.navigate(['/search'], { queryParams: { q } });
      this.clearSearch();
    }
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.search();
    }
  }
}
