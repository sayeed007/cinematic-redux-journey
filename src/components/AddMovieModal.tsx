
import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { addMovie } from '../redux/features/movieSlice';
import { MovieStatus } from '../types/movie';

interface AddMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [status, setStatus] = useState<MovieStatus>('watchlist');

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      dispatch(addMovie({
        name: name.trim(),
        status,
        review: '',
      }));
      
      // Reset form and close modal
      setName('');
      setStatus('watchlist');
      onClose();
    }
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Add New Movie</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Movie name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-100"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as MovieStatus)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-100"
            >
              <option value="watchlist">Watch List</option>
              <option value="watching">Watching</option>
              <option value="watched">Watched</option>
            </select>
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

export default AddMovieModal;
