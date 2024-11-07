import axios from 'axios';
import * as Secret from './secret/secret';

const API_KEY = Secret.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; 

export const fetchMovieDetailsByName = async (movieName, releaseYear = null) => {
  try {
    // search movie name
    let searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`;
    if (releaseYear) {
      searchUrl += `&year=${releaseYear}`;
    }
    
    const searchResponse = await axios.get(searchUrl);
    const searchResults = searchResponse.data.results;

    if (searchResults.length === 0) {
      throw new Error('No movies found with that name.');
    }

    // filter by title match 
    const exactMatch = searchResults.find(movie => movie.title.toLowerCase() === movieName.toLowerCase());

    // use exact match if found, otherwise use the first result
    const movieId = exactMatch ? exactMatch.id : searchResults[0].id;

    // fetch movie details by ID
    const movieDetailsResponse = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const creditsResponse = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);

    const movieDetails = movieDetailsResponse.data;
    const credits = creditsResponse.data;

    const director = credits.crew.find(member => member.job === 'Director');
    const countryOfOrigin = movieDetails.production_countries.map(country => country.name).join(', ');
    const languages = movieDetails.spoken_languages.map(language => language.english_name).join(', ');
    const genres = movieDetails.genres.map(genre => genre.name).join(', ');

    const posterUrl = `${IMAGE_BASE_URL}${movieDetails.poster_path}`;
    // print poster url?? to check ??
    // console.log('Poster URL:', posterUrl); 

    return {
      ...movieDetails,
      director: director ? director.name : 'N/A',
      countryOfOrigin,
      languages,
      genres,
      posterUrl,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error; 
  }
};
