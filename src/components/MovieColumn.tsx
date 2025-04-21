import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import MovieCard from './MovieCard';
import { Movie, MovieStatus } from '../types/movie';
import { motion, AnimatePresence } from 'framer-motion';

interface MovieColumnProps {
  title: string;
  status: MovieStatus;
  movies: Movie[];
  openReviewModal: (movie: Movie) => void;
}

const MovieColumn: React.FC<MovieColumnProps> = ({ title, status, movies, openReviewModal }) => {
  // Determine background color and border based on status
  const bgColor =
    status === 'watchlist'
      ? 'bg-orange-100'
      : status === 'watching'
        ? 'bg-purple-100'
        : 'bg-green-100';

  const headerBg =
    status === 'watchlist'
      ? 'bg-orange-200'
      : status === 'watching'
        ? 'bg-purple-200'
        : 'bg-green-200';

  return (
    <motion.div
      className={`flex-1 mx-2 rounded-lg overflow-hidden shadow-md ${bgColor}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: status === 'watchlist' ? 0.1 : status === 'watching' ? 0.2 : 0.3
      }}
      whileHover={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      layout
    >
      <motion.h2
        className={`text-center font-bold text-gray-700 py-2 ${headerBg}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {title}
      </motion.h2>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <motion.div
            className={`min-h-[400px] p-3 max-h-[600px] overflow-y-auto ${snapshot.isDraggingOver ? 'bg-gray-100 opacity-90' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            animate={{
              backgroundColor: snapshot.isDraggingOver ? 'rgba(243, 244, 246, 1)' : 'transparent'
            }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence>
              {movies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={index}
                  openReviewModal={openReviewModal}
                />
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </motion.div>
        )}
      </Droppable>
    </motion.div>
  );
};

export default MovieColumn;