
export type MovieStatus = 'watchlist' | 'watching' | 'watched';

export interface Movie {
  id: number;
  name: string;
  review: string;
  status: MovieStatus;
}
