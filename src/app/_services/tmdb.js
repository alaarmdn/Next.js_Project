const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies(page = 1, language = 'en') {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&language=${language}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
}

export async function getNowPlaying(page = 1, language = 'en') {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}&language=${language}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export async function getMovieDetails(id, language = 'en') {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=${language}&append_to_response=recommendations,credits,videos`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

export async function getMovieRecommendations(movieId, language = 'en') {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=${language}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}

export async function searchMovies(query, page = 1, language = 'en') {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=${language}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
} 