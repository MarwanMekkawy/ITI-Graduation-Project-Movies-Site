import { MovieGenre } from './movie-genre';
export interface Movie {
  movieId: number;
  title: string;
  description: string;
  releaseDate: string;          
  posterUrl: string;
  movieImage: string;
  imDbRating: number;
  episodes?: Episode[]; 
  genres: (MovieGenre| null)[]; 
}
export interface Episode {
  episodeId: number;
  title: string;
  episodeUrl: string;
  episodeImage: string;
}