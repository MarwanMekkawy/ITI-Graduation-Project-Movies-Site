import { MoviesService } from './../../core/services/movies-service';
import { Movie } from './../../core/models/movie.interface';
import { Component, inject } from '@angular/core';
import { SlideShow } from "../../child-components/slide-show/slide-show";
import { CarouselComponent } from "../../child-components/carousel/carousel";

@Component({
  selector: 'app-home-page',
  imports: [SlideShow, CarouselComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
 private readonly moviesService = inject(MoviesService);
    items!: Movie[] ;
    movies!: Movie[] ;
    series!: Movie[] ;
    topRatedItems!: Movie[] ;
    LatestItems!: Movie[] ;
    actionMovies!: Movie[] ;
    comedyMovies!: Movie[] ;
    dramaMovies!: Movie[] ;
    kidsMovies!: Movie[] ;





 ngOnInit(): void {
    this.moviesService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
    this.moviesService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
    this.moviesService.getAllSeries().subscribe({
      next: (data) => {
        this.series = data;
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
    this.moviesService.getTopRatedItems().subscribe({
      next: (data) => {
        this.topRatedItems = data;
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
    this.moviesService.getLatestItems().subscribe({
      next: (data) => {
        this.LatestItems = data;
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
    this.moviesService.getItemsByGenreId(1).subscribe({
      next: (data) => {
        this.actionMovies = data;
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
    this.moviesService.getItemsByGenreId(2).subscribe({
      next: (data) => {
        this.comedyMovies = data;
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
    this.moviesService.getItemsByGenreId(3).subscribe({
      next: (data) => {
        this.dramaMovies = data;
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
     this.moviesService.getItemsByGenreId(3).subscribe({
      next: (data) => {
        this.kidsMovies = data;
      },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
  }
  
  
}
