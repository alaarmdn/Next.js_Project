'use client';

import { useState, useEffect, use, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieDetails } from '@/app/_services/tmdb';
import { useFavorites } from '@/context/FavoritesContext';
import { useLanguage } from '@/context/LanguageContext';
import MovieCard from '@/_components/movie/MovieCard';
import { Heart, Globe, Link as LinkIcon, Loader2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export default function MovieDetails({ params }) {
  const { id } = use(params);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = movie ? isFavorite(movie.id) : false;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id, language);
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, language]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        <span className="ml-4 text-xl">Loading movie details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!movie) {
    notFound();
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  return (
    <div className="min-h-screen bg-white text-black pb-12">
      {/* Hero section with backdrop */}
      <section
        className="relative min-h-[80vh] bg-cover bg-center flex items-end p-8"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(44, 41, 41, 0.3), rgba(255, 255, 255, 0.05)), url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-70"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-end sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 max-w-7xl mx-auto w-full">
          <div className="flex-shrink-0 relative w-64 h-96 rounded-lg overflow-hidden shadow-xl border border-gray-200">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold leading-tight mb-0.5">
                {movie.title}
              </h1>
              <button
                onClick={() => toggleFavorite(movie)}
                className="p-3 rounded-full bg-maroon hover:bg-[#220004] transition-colors duration-200"
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={`w-7 h-7 transition-colors ${
                    isFav ? 'fill-red-600 text-red-600' : 'text-white'
                  }`}
                />
              </button>
            </div>
            <p className="text-black mb-4">
              {movie.release_date || 'N/A'}
            </p>
            
            {movie.vote_average > 0 && (
              <div className="flex items-center text-black mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(movie.vote_average / 2) ? 'text-yellow-500 fill-yellow-500' : 'text-black'}`}
                  />
                ))}
                <span className="ml-2 text-black">{movie.vote_count}</span>
              </div>
            )}

            <p className="text-black leading-relaxed mb-6">
              {movie.overview}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres && movie.genres.length > 0
                ? movie.genres.map((genre) => (
                    <span key={genre.id} className="bg-dark-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {genre.name}
                    </span>
                  ))
                : 'N/A'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {movie.runtime > 0 && (
                <div>
                  <span className="font-semibold">Duration:</span> {movie.runtime} Min.
                </div>
              )}
              {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                <div>
                  <span className="font-semibold">Languages:</span> {movie.spoken_languages.map((lang) => lang.english_name).join(', ')}
                </div>
              )}
            </div>
            
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-4">
                {movie.production_companies.map((company) => (
                  company.logo_path && (
                    <div key={company.id} className="p-2 rounded-lg">
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        width={100}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                  )
                ))}
              </div>
            )}

            {movie.homepage && (
              <div className="mb-6">
                <Link
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Website
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-black">Recommendations</h2>
          {movie.recommendations && movie.recommendations.results.length > 0 ? (
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {movie.recommendations.results.slice(0, 10).map((recMovie) => (
                    <div key={recMovie.id} className="flex-[0_0_25%] min-w-0 sm:flex-[0_0_33.33%] md:flex-[0_0_25%] px-2">
                      <MovieCard movie={recMovie} />
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-maroon text-white p-2 rounded-full hover:bg-[#220004] transition-colors duration-200 shadow-lg"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-maroon text-white p-2 rounded-full hover:bg-[#220004] transition-colors duration-200 shadow-lg"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <p className="text-black">No recommendations available.</p>
          )}
        </div>
      </section>
    </div>
  );
} 