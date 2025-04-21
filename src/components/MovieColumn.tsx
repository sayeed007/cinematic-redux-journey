
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import MovieCard from './MovieCard';
import { Movie, MovieStatus } from '../types/movie';

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
    <div className={`flex-1 mx-2 rounded-lg overflow-hidden shadow-md ${bgColor}`}>
      <h2 className={`text-center font-bold text-gray-700 py-2 ${headerBg}`}>{title}</h2>
      
      <Droppable droppableId={status}>
        {(provided) => (
          <div 
            className="min-h-[400px] p-3 max-h-[600px] overflow-y-auto"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {movies.map((movie, index) => (
              <MovieCard 
                key={movie.id}
                movie={movie}
                index={index}
                openReviewModal={openReviewModal}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default MovieColumn;
