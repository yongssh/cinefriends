import React from 'react';
import { getMostRewatchesUser } from '../components/MostRewatches'; // Import the function to get most rewatches user

const MostRewatchesPage = ({ recentlyWatchedMovies, onClick }) => {
  const mostRewatchesUser = getMostRewatchesUser(recentlyWatchedMovies);

  return (
    <div>
      <h2>User with the Most Rewatches:</h2>
      <p>{mostRewatchesUser}</p>
      <p>You keep going back to what you know and love</p>
      <p>
        <button onClick={() => onClick(4)}>Next: Most Reviews</button>
      </p>
    </div>
  );
};

export default MostRewatchesPage;
