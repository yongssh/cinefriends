// MostReviewsPage.js
import React from 'react';
import { getMostReviewsUser } from '../components/getMostReviews.js'; // Import the function to get most reviews user

const MostReviewsPage = ({ recentlyWatchedMovies, onClick }) => {
  const mostReviewsUser = getMostReviewsUser(recentlyWatchedMovies);

  return (
    <div>
      <h2>User with the Most Reviews:</h2>
      <p>{mostReviewsUser}</p>
      <p>A lot of opinions</p>
      <p>
        <button onClick={() => onClick(5)}>See More</button>
      </p>
    </div>
  );
};

export default MostReviewsPage;
