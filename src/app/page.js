'use client';

import { useState, useEffect } from 'react';
import MovieCard from '@/_components/movie/MovieCard';
import { getPopularMovies } from '@/app/_services/tmdb';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import Pagination from '@/_components/common/Pagination';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularMovies(page, language);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
        console.error('Error fetching popular movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, language]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-maroon via-red-900 to-red-800 h-[400px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Placeholder for background image/pattern */}
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542204165-27a9602f43a0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-maroon/50 to-maroon/80"></div>
        <div className="relative z-10 p-4 max-w-4xl mx-auto w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg text-white">Elevante Cinema</h1>
            <p className="text-lg text-white mb-8">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <form 
              key="search-form"
              onSubmit={handleSearch} 
              className="flex bg-white rounded-full p-1 shadow-xl"
            >
              <input
                type="text"
                placeholder="Search and explore..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-6 py-3 rounded-full text-gray-800 focus:outline-none"
                suppressHydrationWarning
              />
              <button
                type="submit"
                className="bg-maroon hover:bg-[#220004] text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center justify-center"
                suppressHydrationWarning
              >
                <Search className="w-5 h-5 mr-2" /> Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Now Playing Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Now Playing</h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-96 w-full"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <p>{error}</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center py-12 text-gray-800">
              <p>No movies found.</p>
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
