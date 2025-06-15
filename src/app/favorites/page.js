'use client';

import WishlistItem from '@/_components/favorites/WishlistItem';
import { useFavorites } from '@/context/FavoritesContext';
import { HeartOff } from 'lucide-react';
import Link from 'next/link';

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-white text-gray-800 p-4">
        <HeartOff className="h-24 w-24 text-gray-400 mb-6" />
        <h2 className="text-2xl font-semibold mb-4">
          No Movies in watch list
        </h2>
        <Link 
          href="/" 
          className="bg-maroon hover:bg-red-900 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-0.5"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Watch list</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((movie) => (
            <WishlistItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
} 