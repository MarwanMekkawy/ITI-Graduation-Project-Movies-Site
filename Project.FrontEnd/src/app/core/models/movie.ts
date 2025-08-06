import { MovieGenre } from './movie-genre';
export interface Movie {
     movieId: number;
  title: string;
  description: string;
  releaseDate: string;          // or Date if parsed
  posterUrl: string;
  movieImage: string;
  imDbRating: number;
  genres: (MovieGenre| null)[]; // Some items are null
}
