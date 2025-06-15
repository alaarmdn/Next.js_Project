'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

export default function WishlistItem({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);

  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01] flex-col sm:flex-row">
      <Link href={`/movie/${movie.id}`} className="flex-shrink-0 relative w-full sm:w-48 h-64 sm:h-auto overflow-hidden rounded-l-lg">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 20vw"
        />
      </Link>
      <div className="flex-grow p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link href={`/movie/${movie.id}`}>
              <h3 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                {movie.title}
              </h3>
            </Link>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
              <button
                onClick={() => toggleFavorite(movie)}
                className="flex-shrink-0 p-2 rounded-full hover:bg-red-500/20 transition-colors"
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isFav ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </p>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span>{movie.vote_average?.toFixed(1)}</span>
            <span className="ml-2">({movie.vote_count} votes)</span>
          </div>
          <p className="text-gray-700 mt-3 line-clamp-3">
            {movie.overview || 'No description available.'}
          </p>
        </div>
      </div>
    </div>
  );
} 