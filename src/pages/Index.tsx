
import React from 'react';
import MovieBoard from '../components/MovieBoard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-700 text-white py-4 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Movie Tracker App</h1>
          <p className="text-gray-200">Organize your movies with drag and drop</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <MovieBoard />
      </main>
    </div>
  );
};

export default Index;
