
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Movie } from '../types/movie';
import { useAppDispatch } from '../redux/hooks';
import { updateMovieReview } from '../redux/features/movieSlice';

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

  return (
    <Draggable draggableId={movie.id.toString()} index={index}>
      {(provided) => (
        <div
          className={`mb-3 rounded-md shadow p-3 border ${styles.card}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-800">Name: {movie.name}</h3>
            <button
              onClick={handleEditClick}
              className={`text-xs px-2 py-1 text-white rounded ${styles.button}`}
            >
              Edit
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            <p className="italic">Review: {movie.review || 'No review yet'}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default MovieCard;
