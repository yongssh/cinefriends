// TestFetchPage.js
import React, { useState } from 'react';
import { fetchMovieDetailsByName } from '../TMDBquery';

const TestFetchPage = () => {
  const [movieName, setMovieName] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchMovieDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const details = await fetchMovieDetailsByName(movieName);
      console.log('Fetched Movie Details:', details); // Log the details for debugging
      setMovieDetails(details);
    } catch (err) {
      setError(err.message || 'Error fetching movie details.');
      setMovieDetails(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Fetch Movie Details</h1>
      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Enter Movie Name"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleFetchMovieDetails();
        }}
      />
      <button onClick={handleFetchMovieDetails} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Movie Details'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movieDetails && (
        <div>
          <h2>{movieDetails.title}</h2>
          {movieDetails.posterUrl && (
            <img
              src={movieDetails.posterUrl}
              alt={`${movieDetails.title} Poster`}
              style={{ width: '200px' }}
              onError={(e) => console.error('Image loading error:', e)} // Log image loading error
            />
          )}
          <p><strong>Overview:</strong> {movieDetails.overview}</p>
          <p><strong>Director:</strong> {movieDetails.director}</p>
          <p><strong>Country of Origin:</strong> {movieDetails.countryOfOrigin}</p>
          <p><strong>Language(s):</strong> {movieDetails.languages}</p>
          <p><strong>Genres:</strong> {movieDetails.genres}</p>
          <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
          {/* Add other movie details as needed */}
        </div>
      )}
    </div>
  );
};

export default TestFetchPage;
