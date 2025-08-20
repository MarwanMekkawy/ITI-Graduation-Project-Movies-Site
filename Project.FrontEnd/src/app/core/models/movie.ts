import { MovieGenre } from './movie-genre';
export interface Movie {
  movieId: number;
  title: string;
  description: string;
  releaseDate: string;          // or Date if parsed
  posterUrl: string;
  movieImage: string;
  imDbRating: number;
  episodes?: Episode[]; // optional because movies won’t have it
  genres: (MovieGenre| null)[]; // Some items are null
}
export interface Episode {
  episodeId: number;
  title: string;
  episodeUrl: string;
  episodeImage: string;
}