'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';
import { Heart, MoreHorizontal } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);

  // Ensure movie.vote_average is a number and within 0-100 range
  const voteAverage = movie.vote_average ? Math.round(movie.vote_average * 10) : 0;
  const progressBarColor = voteAverage > 70 ? '#4CAF50' : voteAverage > 50 ? '#FFC107' : '#F44336';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative group transform transition-transform duration-300 hover:scale-105">
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="relative w-full h-80">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md" style={{ width: 40, height: 40 }}>
            <CircularProgressbar
              value={voteAverage}
              text={`${voteAverage}%`}
              styles={buildStyles({
                pathColor: progressBarColor,
                textColor: progressBarColor,
                trailColor: '#d6d6d6',
                backgroundColor: '#3e98c7',
              })}
            />
          </div>
        </div>
      </Link>

      <div className="p-4 relative">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{movie.title}</h3>
          <button
            onClick={() => toggleFavorite(movie)}
            className="text-gray-400 hover:text-dark-pink transition-colors"
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-6 h-6 ${isFav ? 'fill-red-600 text-red-600' : 'text-gray-400'}`} />
          </button>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{movie.overview}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </span>
          <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
} 