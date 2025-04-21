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
import { motion, AnimatePresence } from 'framer-motion';

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
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"
        ></motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          Loading movies...
        </motion.p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="text-center py-8 text-red-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Error: {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-4 bg-gray-200 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SearchBar onAddNewClick={() => setIsAddModalOpen(true)} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div
          className="flex flex-wrap mx-auto gap-10"
          layout
        >
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
        </motion.div>
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
    </motion.div>
  );
};

export default MovieBoard;