// MostReviews.js
import { getLastYearMovies } from "./getLastYearMovies";

export const getMostReviewsUser = (userData) => {
  let mostReviewsUser = null;
  let maxReviewsCount = 0;

  // Iterate over each user's data
  for (const username in userData) {
    const diaryData = userData[username];
    const lastYearMovies = getLastYearMovies(diaryData);

    // Count reviews for the current user
    let reviewsCount = 0;
    for (const movie of lastYearMovies) {
      if (movie.review_text && movie.review_text.trim().length > 0) {
        reviewsCount++;
      }
    }

    // Update most reviews user if this user has more reviews
    if (reviewsCount > maxReviewsCount) {
      maxReviewsCount = reviewsCount;
      mostReviewsUser = username;
    }
  }

  return mostReviewsUser;
};
