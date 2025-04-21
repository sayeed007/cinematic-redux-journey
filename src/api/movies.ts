
import { Movie } from '../types/movie';
import movieData from '../data/movies.json';

// Simulating an API call with a delay
export const fetchMovies = (): Promise<Movie[]> => {
  return new Promise((resolve) => {
    // Add a slight delay to simulate network request
    setTimeout(() => {
      resolve(movieData as Movie[]);
    }, 500);
  });
};
