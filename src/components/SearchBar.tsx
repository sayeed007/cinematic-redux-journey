
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSearchQuery, selectSearchQuery } from '../redux/features/movieSlice';

interface SearchBarProps {
  onAddNewClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAddNewClick }) => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="flex items-center justify-between mb-6 max-w-4xl mx-auto">
      <div className="flex-1 mr-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Type here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      
      <div className="flex space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Search
        </button>
        
        <button
          onClick={onAddNewClick}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Add New
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
