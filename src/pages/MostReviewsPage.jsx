import React, { useEffect, useState } from 'react';
import { getMostReviewsUser } from '../components/getMostReviews.js';
import '../styles/styles.css';

const defaultReviews = [
  '"Breathtaking cinematography, the work of a visionary..."',
  '"More than just a summer blockbuster!"',
  '"Guaranteed to make you laugh, cry, then laugh again."',
  '"Not just a must-watch, but a must-rewatch."',
  '"Blood-curdling, heart-racing... you\'ll have to sleep with a nightlight!"',
  '"A moving tale of friendship and family."',
  '"Simply entrancing."',
  '"The perfect film to chase away the Monday night blues."',
  '"Incredible soundtrack."',
  '"A shoo-in for awards season."'
];

const shuffleReviews = (reviews) => {
  for (let i = reviews.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reviews[i], reviews[j]] = [reviews[j], reviews[i]];
  }
  return reviews;
};

const MostReviewsPage = ({ recentlyWatchedMovies, onClick }) => {
  const [mostReviewsUser, setMostReviewsUser] = useState(null);
  const [maxReviewsCount, setMaxReviewsCount] = useState(0);
  const [shuffledReviews, setShuffledReviews] = useState([]);

  useEffect(() => {
    const { mostReviewsUser, maxReviewsCount } = getMostReviewsUser(recentlyWatchedMovies);
    setMostReviewsUser(mostReviewsUser);
    setMaxReviewsCount(maxReviewsCount);
    setShuffledReviews(shuffleReviews([...defaultReviews]));
  }, [recentlyWatchedMovies]);

  return (
    <div className="most-reviews-page">
      <div className="fade-in-container">
        {shuffledReviews.map((review, index) => (
          <div
            key={index}
            className="fade-in-review"
            style={{ animationDelay: `${index * 2}s` }}
          >
            {review}
          </div>
        ))}
      </div>

      <h2
        className="fade-in-header"
        style={{ animationDelay: `${shuffledReviews.length * 2}s` }}
      >
        {mostReviewsUser ? `But the real opinions belong to ${mostReviewsUser}` : 'Loading...'}
      </h2>

      <p
        className="fade-in-review-count"
        style={{ animationDelay: `${(shuffledReviews.length + 1) * 2}s` }}
      >
        {mostReviewsUser ? `They wrote ${maxReviewsCount} reviews last year.` : ''}
      </p>

      <button className="next-page-button" onClick={() => onClick(4)}>
        Next
      </button>
    </div>
  );
};

export default MostReviewsPage;
