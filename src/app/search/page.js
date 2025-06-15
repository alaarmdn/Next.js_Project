'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MovieCard from '@/_components/movie/MovieCard';
import { searchMovies } from '@/app/_services/tmdb';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from '@/_components/common/Pagination';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { language } = useLanguage();

  // Effect to fetch movies when query or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (!initialQuery) {
        setMovies([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(initialQuery, page, language);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [initialQuery, page, language]);

  // Effect to update currentSearchQuery when initialQuery changes from URL
  useEffect(() => {
    setCurrentSearchQuery(initialQuery);
    setPage(1); // Reset page to 1 when search query changes
  }, [initialQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (currentSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(currentSearchQuery.trim())}`);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Search Input Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="flex bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
            <input
              type="text"
              placeholder="Search for movies..."
              value={currentSearchQuery}
              onChange={(e) => setCurrentSearchQuery(e.target.value)}
              className="flex-grow px-6 py-3 text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-maroon hover:bg-[#220004] text-white px-6 py-3 font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Search Results Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {initialQuery && (
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
              Search Results for: &quot;{initialQuery}&quot;
            </h1>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12 text-gray-800">
              <Loader2 className="h-8 w-8 text-dark-pink animate-spin" />
              <span className="ml-2 text-gray-800">Searching...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <p>{error}</p>
            </div>
          ) : movies.length === 0 && initialQuery ? (
            <div className="text-center py-12 text-gray-800">
              <p className="text-lg">
                No movies found for &quot;{initialQuery}&quot;
              </p>
            </div>
          ) : movies.length === 0 && !initialQuery ? (
            <div className="text-center py-12 text-gray-800">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                Start searching for movies
              </h2>
              <p className="mt-2 text-gray-600">
                Enter a movie title in the search bar above
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && movies.length > 0 && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </div>
  );
} 