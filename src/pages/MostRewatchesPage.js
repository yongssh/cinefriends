import React, { useState, useEffect } from 'react';
import { getMostRewatchesUser } from '../components/MostRewatches'; // Adjust path as needed
import { fetchMovieDetailsByName } from '../TMDBQuery'; // Adjust path as needed
import '../styles/styles.css';

const MostRewatchesPage = ({ recentlyWatchedMovies, onClick }) => {
  const [mostRewatchesUser, setMostRewatchesUser] = useState(null);
  const [mostRewatchedMovieDetails, setMostRewatchedMovieDetails] = useState(null);
  const [mostRewatchedMovie, setMostRewatchedMovie] = useState('');
  const [posterLoaded, setPosterLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getMostRewatchesUser(recentlyWatchedMovies);
      setMostRewatchesUser(user);

      if (user && user.title) {
        try {
          const movieDetails = await fetchMovieDetailsByName(user.title);
          setMostRewatchedMovie(user.title); // Set the most rewatched movie title
          setMostRewatchedMovieDetails(movieDetails);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    };

    fetchData();
  }, [recentlyWatchedMovies]);

  useEffect(() => {
    if (mostRewatchedMovieDetails && mostRewatchedMovieDetails.posterUrl) {
      const img = new Image();
      img.onload = () => setPosterLoaded(true);
      img.src = mostRewatchedMovieDetails.posterUrl;
    }
  }, [mostRewatchedMovieDetails]);

  return (
    <div>
      {mostRewatchesUser && (
          <h2>{mostRewatchesUser.username} left you all in the dust by rewatching {mostRewatchesUser.rewatchCount} movies</h2>
      )}
      {!mostRewatchesUser && <p>Loading...</p>}
      {mostRewatchedMovieDetails && (
      <FadeIn>
        <div>
          <h3>Their most rewatched movie was <em>{mostRewatchedMovie}</em></h3>
          <div className="poster-container">
            {mostRewatchedMovieDetails.posterUrl && (
              <img
                src={mostRewatchedMovieDetails.posterUrl}
                alt={`${mostRewatchedMovieDetails.title} Poster`}
                className={`centered-poster ${posterLoaded ? 'loaded' : ''}`}
              />
            )}
          </div>
        </div>
      </FadeIn>
      )}
      {!mostRewatchedMovieDetails && mostRewatchesUser && <p>Loading movie details...</p>}
      <p>They keep going back to what they know and love.</p>
      <p>
        <button className="next-page-button" onClick={() => onClick(4)}>Next</button>
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
