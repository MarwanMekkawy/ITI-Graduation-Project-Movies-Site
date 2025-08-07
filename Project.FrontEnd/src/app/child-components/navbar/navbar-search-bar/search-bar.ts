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
  query: string = '';
  isFocused: boolean = false;
  results: Movie[] = [];
  highlightedIndex: number = -1;

  private searchTerms = new Subject<string>();

  constructor(
    public el: ElementRef,
    private searchService: SearchService,
    private router: Router
  ) { }

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
      this.highlightedIndex = -1;
    } else {
      this.results = [];
      this.highlightedIndex = -1;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    const max = this.results.length - 1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex = (this.highlightedIndex + 1) % (max + 1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex = (this.highlightedIndex - 1 + (max + 1)) % (max + 1);
        break;

      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.highlightedIndex <= max) {
          const selected = this.results[this.highlightedIndex];
          this.query = selected.title;

          ////swap commnets for insta serach when picking from recomended1////////////////////////////
            // this.search();
            this.query = selected.title;
            this.results = [];
            this.highlightedIndex = -1;
          ////////////////////////////////////////////////////////////////////////////////////////////

        } else {
          this.search();
        }
        break;
      default:
        break;
    }
  }

  onBlur(): void {
    setTimeout(() => {
      this.isFocused = false;
    }, 200); // Let click events fire first
  }

  clearSearch(): void {
    this.query = '';
    this.results = [];
    this.highlightedIndex = -1;
  }

  search(): void {
    const q = this.query.trim();
    if (q) {
      this.router.navigate(['/search'], { queryParams: { q } });
      this.clearSearch();
    }
  }

  selectResult(result: Movie): void {
    this.query = result.title;

    ////swap commnets for insta serach when picking from recomended1////////////////////////////
      //this.search();
      this.query = result.title;
      this.results = [];
      this.highlightedIndex = -1;
    ////////////////////////////////////////////////////////////////////////////////////////////

  }
}
