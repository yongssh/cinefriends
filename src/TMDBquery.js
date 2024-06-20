
import * as Secret from './secret/secret';
import React from 'react';

// tmdb.js

import axios from 'axios';

const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const getMovieDetails = async (movieTitle, releaseYear) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: movieTitle,
        year: releaseYear
      }
    });
    return response.data.results[0]; // Assuming the first result is the closest match
  } catch (error) {
    console.error('Error fetching movie details from TMDB:', error);
    return null;
  }
};

export { getMovieDetails };
