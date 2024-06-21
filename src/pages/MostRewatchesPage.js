import React, { useState, useEffect } from 'react';
import { getMostRewatchesUser } from '../components/MostRewatches'; // Adjust path as needed
import { fetchMovieDetailsById } from '../TMDBQuery'; // Adjust path as needed
import '../styles/styles.css';

const MostRewatchesPage = ({ recentlyWatchedMovies, onClick }) => {
  const [mostRewatchesUser, setMostRewatchesUser] = useState(null);
  const [mostRewatchedMovieDetails, setMostRewatchedMovieDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getMostRewatchesUser(recentlyWatchedMovies);
      setMostRewatchesUser(user);

      if (user && user.movie_id) {
        try {
          const movieDetails = await fetchMovieDetailsById(user.movie_id);
          setMostRewatchedMovieDetails(movieDetails);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    };

    fetchData();
  }, [recentlyWatchedMovies]);

  return (
    <div>
      <h2>User with the Most Rewatches:</h2>
      {mostRewatchesUser && (
        <FadeIn>
          <div className="fade-in-content">
            <h3>{mostRewatchesUser.username}</h3>
            <p>{mostRewatchesUser.title}</p>
            <p>They rewatched {mostRewatchesUser.rewatchCount} movies.</p>
          </div>
        </FadeIn>
      )}
      {!mostRewatchesUser && <p>Loading...</p>}
      {mostRewatchedMovieDetails && (
        <div>
          <h3>Most Rewatched Movie Details:</h3>
          <p>Title: {mostRewatchedMovieDetails.title}</p>
          <p>Overview: {mostRewatchedMovieDetails.overview}</p>
          <p>Release Date: {mostRewatchedMovieDetails.release_date}</p>
          {/* Add more details as needed */}
        </div>
      )}
      {!mostRewatchedMovieDetails && mostRewatchesUser && <p>Loading movie details...</p>}
      <p>You keep going back to what you know and love</p>
      <p>
        <button className="next-page-button" onClick={() => onClick(4)}>Next: Most Reviews</button>
      </p>
    </div>
  );
};

// FadeIn component remains unchanged from previous implementation
const FadeIn = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export default MostRewatchesPage;
