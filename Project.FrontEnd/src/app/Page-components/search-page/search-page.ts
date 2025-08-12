import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCard } from '../../child-components/movie-card/movie-card';
import { SearchService } from '../../core/services/search-service';
import { GenreService } from '../../core/services/genre-service';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [MovieCard],
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.css']
})
export class SearchPage implements OnInit {
  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);
  private genreService = inject(GenreService);

  readonly RELATED_LIMIT = 15;

  query = '';
  movies: Movie[] = [];
  relatedMovies: Movie[] = [];

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(p => {
      this.query = (p.get('q') || '').trim();

      this.movies = [];
      this.relatedMovies = [];

      if (!this.query) return;

      this.searchService.searchMovies(this.query).subscribe({
        next: (res) => {
          this.movies = res ?? [];

          // If no results, just show the title "No results found for {query}"
          if (this.movies.length === 0) return;

          // Only the FIRST genre of the FIRST movie
          const first = this.movies[0] as any;
          const firstGenreId: number | undefined = first?.genres?.[0]?.genreId;
          if (!firstGenreId) return;

          // Fetch related, de-dupe against search results, cap to 15
          this.genreService.getItemsByGenreId(firstGenreId).subscribe({
            next: (items) => {
              const seen = new Set(this.movies.map(m => (m as any).movieId ?? (m as any).id));
              this.relatedMovies = (items ?? [])
                .filter(m => !seen.has((m as any).movieId ?? (m as any).id))
                .slice(0, this.RELATED_LIMIT);
            },
            error: (err) => console.error('Genre items fetch failed:', err)
          });
        },
        error: (err) => console.error('Search fetch failed:', err)
      });
    });
  }
}
