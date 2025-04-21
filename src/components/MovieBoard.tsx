
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  fetchMoviesThunk, 
  selectFilteredMoviesByStatus, 
  updateMovieStatus,
  selectLoading,
  selectError
} from '../redux/features/movieSlice';
import MovieColumn from './MovieColumn';
import SearchBar from './SearchBar';
import AddMovieModal from './AddMovieModal';
import MovieReviewModal from './MovieReviewModal';
import { Movie, MovieStatus } from '../types/movie';

const MovieBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Select movies by status with search filter applied
  const watchlistMovies = useAppSelector(selectFilteredMoviesByStatus('watchlist'));
  const watchingMovies = useAppSelector(selectFilteredMoviesByStatus('watching'));
  const watchedMovies = useAppSelector(selectFilteredMoviesByStatus('watched'));
  
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Fetch movies when the component mounts
  useEffect(() => {
    dispatch(fetchMoviesThunk());
  }, [dispatch]);
  
  // Handle drag end event
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If there's no destination or the item is dropped in the same place, do nothing
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    
    // Get the movie's id from the draggableId
    const movieId = parseInt(draggableId);
    
    // Update the movie's status based on the destination droppableId
    dispatch(updateMovieStatus({
      id: movieId,
      status: destination.droppableId as MovieStatus,
    }));
  };
  
  // Handle opening the review modal
  const handleOpenReviewModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsReviewModalOpen(true);
  };
  
  // Handle closing the review modal
  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedMovie(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-200 rounded-lg">
      <SearchBar onAddNewClick={() => setIsAddModalOpen(true)} />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap -mx-2 max-w-5xl mx-auto">
          <MovieColumn 
            title="Watch List" 
            status="watchlist" 
            movies={watchlistMovies}
            openReviewModal={handleOpenReviewModal}
          />
          
          <MovieColumn 
            title="Watching" 
            status="watching" 
            movies={watchingMovies}
            openReviewModal={handleOpenReviewModal}
          />
          
          <MovieColumn 
            title="Watched" 
            status="watched" 
            movies={watchedMovies}
            openReviewModal={handleOpenReviewModal}
          />
        </div>
      </DragDropContext>
      
      {/* Modals */}
      <AddMovieModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
      
      <MovieReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={handleCloseReviewModal} 
        movie={selectedMovie}
      />
    </div>
  );
};

export default MovieBoard;
