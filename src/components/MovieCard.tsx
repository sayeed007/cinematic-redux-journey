import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Movie } from '../types/movie';
import { useAppDispatch } from '../redux/hooks';
import { motion } from 'framer-motion';

interface MovieCardProps {
  movie: Movie;
  index: number;
  openReviewModal: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index, openReviewModal }) => {
  const dispatch = useAppDispatch();

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openReviewModal(movie);
  };

  // Custom styling based on status
  const getCardStyle = (status: string) => {
    if (status === 'watchlist') {
      return {
        card: 'bg-orange-50 border-orange-200',
        button: 'bg-orange-600 hover:bg-orange-700'
      };
    } else if (status === 'watching') {
      return {
        card: 'bg-purple-50 border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700'
      };
    } else {
      return {
        card: 'bg-green-50 border-green-200',
        button: 'bg-green-600 hover:bg-green-700'
      };
    }
  };

  const styles = getCardStyle(movie.status);

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    tap: { scale: 0.98 }
  };

  return (
    <Draggable draggableId={movie.id.toString()} index={index}>
      {(provided, snapshot) => {
        // This approach separates the motion properties from draggable props
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              // We'll apply Framer Motion styles using CSS classes and JS instead of the motion component
              transition: snapshot.isDragging ? 'none' : 'transform 0.2s, box-shadow 0.2s'
            }}
            className={`mb-3 rounded-md shadow p-3 border ${styles.card} transform transition-all duration-300`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-800">Name: {movie.name}</h3>
              <motion.button
                onClick={handleEditClick}
                className={`text-xs px-2 py-1 text-white rounded ${styles.button}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Edit
              </motion.button>
            </div>

            <div className="text-sm text-gray-600">
              <p className="italic">Review: {movie.review || 'No review yet'}</p>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default MovieCard;