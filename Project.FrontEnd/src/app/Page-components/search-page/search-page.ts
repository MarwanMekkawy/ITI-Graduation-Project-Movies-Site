import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCard } from '../../child-components/movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../core/services/search-service';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [MovieCard, CommonModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage {
  private readonly route = inject(ActivatedRoute);
  private readonly searchService = inject(SearchService);

  movies: Movie[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query && query.length > 0) {
        this.searchService.searchMovies(query).subscribe({
          next: (res) => this.movies = res,
          error: (err) => console.error('Search fetch failed:', err)
        });
      }
    });
  }
}
