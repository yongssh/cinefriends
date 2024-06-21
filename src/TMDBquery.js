// TMDBQuery.js (or relevant file)
import axios from 'axios';

const API_KEY = '807e85168ae455c6cc5f564d5cbd9b6c';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovieDetailsById = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return response.data; // Assuming TMDB returns data in response.data
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error; // Handle error as needed
  }
};
