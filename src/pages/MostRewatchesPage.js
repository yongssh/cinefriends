import React, { useState, useEffect } from 'react';
import { getMostRewatchesUser } from '../components/MostRewatches'; // Import the function to get most rewatches user
import '../styles/styles.css';

const MostRewatchesPage = ({ recentlyWatchedMovies, onClick }) => {
  const [mostRewatchesUser, setMostRewatchesUser] = useState(null);

  useEffect(() => {
    // Simulating an asynchronous fetch or calculation
    const fetchData = async () => {
      const user = await getMostRewatchesUser(recentlyWatchedMovies);
      setMostRewatchesUser(user);
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
      <p>You keep going back to what you know and love</p>
      <p>
        <button className="next-page-button" onClick={() => onClick(4)}>Next: Most Reviews</button>
      </p>
    </div>
  );
};

// Simple fade-in component using CSS transitions
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
