import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSearchQuery, selectSearchQuery } from '../redux/features/movieSlice';
import { motion } from 'framer-motion';

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
    <motion.div
      className="flex items-center justify-between mb-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex-1 mr-4"
        whileHover={{ scale: 1.01 }}
      >
        <motion.input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Type here..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(109, 40, 217, 0.3)" }}
        />
      </motion.div>

      <div className="flex space-x-2">
        <motion.button
          className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100"
          whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Search
        </motion.button>

        <motion.button
          onClick={onAddNewClick}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          whileHover={{ scale: 1.05, backgroundColor: "#7c3aed" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Add New
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;