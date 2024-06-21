// TestFetchPage.js
import React, { useState } from 'react';
import { fetchMovieDetailsById } from './TMDBQuery'; // Adjust the import path as necessary

const TestFetchPage = () => {
  const [movieId, setMovieId] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchMovieDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const details = await fetchMovieDetailsById(movieId);
      setMovieDetails(details);
    } catch (err) {
      setError('Error fetching movie details.');
      setMovieDetails(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Fetch Movie Details</h1>
      <input
        type="text"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        placeholder="Enter Movie ID"
      />
      <button onClick={handleFetchMovieDetails} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Movie Details'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movieDetails && (
        <div>
          <h2>{movieDetails.title}</h2>
          <p>{movieDetails.overview}</p>
          {/* Add other movie details as needed */}
        </div>
      )}
    </div>
  );
};

export default TestFetchPage;
