import axios from 'axios';

const API_KEY = '807e85168ae455c6cc5f564d5cbd9b6c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // You can choose a different size if needed

export const fetchMovieDetailsByName = async (movieName, releaseYear = null) => {
  try {
    // First, search for the movie by name
    let searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`;
    if (releaseYear) {
      searchUrl += `&year=${releaseYear}`;
    }
    
    const searchResponse = await axios.get(searchUrl);
    const searchResults = searchResponse.data.results;

    if (searchResults.length === 0) {
      throw new Error('No movies found with that name.');
    }

    // Filter by exact title match (case-insensitive)
    const exactMatch = searchResults.find(movie => movie.title.toLowerCase() === movieName.toLowerCase());

    // Use the exact match if found, otherwise fallback to the first result
    const movieId = exactMatch ? exactMatch.id : searchResults[0].id;

    // Fetch movie details by ID
    const movieDetailsResponse = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const creditsResponse = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);

    const movieDetails = movieDetailsResponse.data;
    const credits = creditsResponse.data;

    const director = credits.crew.find(member => member.job === 'Director');
    const countryOfOrigin = movieDetails.production_countries.map(country => country.name).join(', ');
    const languages = movieDetails.spoken_languages.map(language => language.english_name).join(', ');
    const genres = movieDetails.genres.map(genre => genre.name).join(', ');

    const posterUrl = `${IMAGE_BASE_URL}${movieDetails.poster_path}`;
    console.log('Poster URL:', posterUrl); // Log the poster URL for debugging

    return {
      ...movieDetails,
      director: director ? director.name : 'N/A',
      countryOfOrigin,
      languages,
      genres,
      posterUrl, // Add poster URL to the returned object
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error; // Handle error as needed
  }
};
