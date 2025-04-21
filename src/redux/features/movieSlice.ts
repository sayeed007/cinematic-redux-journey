
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieStatus } from '../../types/movie';
import { fetchMovies } from '../../api/movies';
import { RootState } from '../store';

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  initialFetchDone: boolean;
  searchQuery: string;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  initialFetchDone: false,
  searchQuery: '',
};

// Async thunk for fetching movies
export const fetchMoviesThunk = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { getState }) => {
    const state = getState() as RootState;
    // Only fetch if we haven't already done the initial fetch
    if (state.movies.initialFetchDone) {
      return state.movies.movies;
    }
    const response = await fetchMovies();
    return response;
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addMovie: (state, action: PayloadAction<Omit<Movie, 'id'>>) => {
      const newId = state.movies.length > 0 
        ? Math.max(...state.movies.map(movie => movie.id)) + 1 
        : 1;
      
      state.movies.push({
        ...action.payload,
        id: newId,
      });
    },
    updateMovieStatus: (state, action: PayloadAction<{ id: number; status: MovieStatus }>) => {
      const { id, status } = action.payload;
      const movie = state.movies.find(movie => movie.id === id);
      if (movie) {
        movie.status = status;
      }
    },
    updateMovieReview: (state, action: PayloadAction<{ id: number; review: string }>) => {
      const { id, review } = action.payload;
      const movie = state.movies.find(movie => movie.id === id);
      if (movie) {
        movie.review = review;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.initialFetchDone = true;
      })
      .addCase(fetchMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

// Export actions
export const { 
  setSearchQuery, 
  addMovie, 
  updateMovieStatus, 
  updateMovieReview 
} = movieSlice.actions;

// Selectors
export const selectAllMovies = (state: RootState) => state.movies.movies;
export const selectMoviesByStatus = (status: MovieStatus) => (state: RootState) => 
  state.movies.movies.filter(movie => movie.status === status);
export const selectFilteredMovies = (state: RootState) => {
  const { movies, searchQuery } = state.movies;
  if (!searchQuery.trim()) return movies;
  
  return movies.filter(movie => 
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
export const selectFilteredMoviesByStatus = (status: MovieStatus) => (state: RootState) => {
  const filteredMovies = selectFilteredMovies(state);
  return filteredMovies.filter(movie => movie.status === status);
};
export const selectLoading = (state: RootState) => state.movies.loading;
export const selectError = (state: RootState) => state.movies.error;
export const selectSearchQuery = (state: RootState) => state.movies.searchQuery;

export default movieSlice.reducer;
