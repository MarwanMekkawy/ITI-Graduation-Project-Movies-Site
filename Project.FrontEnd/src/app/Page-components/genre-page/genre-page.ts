import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { GenreService } from './../../core/services/genre-service';
import { Movie } from './../../core/models/movie';
import { MovieCard } from "../../child-components/movie-card/movie-card";
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [MovieCard, CommonModule],
  templateUrl: './genre-page.html',
  styleUrls: ['./genre-page.css']
})
export class GenrePage implements OnInit {
  private readonly genreService = inject(GenreService);
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(Title);

  genreId!: number;
  genreName = '';
  movies: Movie[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.genreId = idParam ? +idParam : 0;

      if (this.genreId) {
        this.genreService.getMoviesByGenreId(this.genreId).subscribe({
          next: (genre) => {
            this.movies = genre;

            this.genreService.getAllGenres().subscribe(res => {
              const match = res.find(g => g.genreId === this.genreId);
              this.genreName = match?.name ?? 'Unknown Genre';

              // ✅ Set browser tab title
              this.titleService.setTitle(`${this.genreName}`);
            });
          },
          error: (err) => console.error(`❌ Failed to load genre ${this.genreId}:`, err)
        });
      }
    });
  }
}
