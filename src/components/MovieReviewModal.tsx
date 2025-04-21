import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { updateMovieReview } from '../redux/features/movieSlice';
import { Movie } from '../types/movie';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {isOpen && movie && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.h2
              className="text-xl font-bold mb-4 text-center text-gray-800"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Edit Review - {movie.name}
            </motion.h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <motion.input
                  type="text"
                  value={movie.name}
                  disabled
                  className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md bg-gray-200"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
                <motion.textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[120px] bg-gray-100"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(109, 40, 217, 0.3)" }}
                />
              </div>

              <motion.div
                className="flex justify-end space-x-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MovieReviewModal;