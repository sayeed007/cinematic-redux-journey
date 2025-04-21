
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { updateMovieReview } from '../redux/features/movieSlice';
import { Movie } from '../types/movie';

interface MovieReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
}

const MovieReviewModal: React.FC<MovieReviewModalProps> = ({ isOpen, onClose, movie }) => {
  const dispatch = useAppDispatch();
  const [review, setReview] = useState('');
  
  useEffect(() => {
    if (movie) {
      setReview(movie.review || '');
    }
  }, [movie]);

  // If modal is not open or no movie selected, don't render anything
  if (!isOpen || !movie) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    dispatch(updateMovieReview({
      id: movie.id,
      review: review,
    }));
    
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Edit Review - {movie.name}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input 
              type="text"
              value={movie.name} 
              disabled
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md bg-gray-200"
            />
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[120px] bg-gray-100"
            />
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieReviewModal;
