// MostRewatches.js

import { getLastYearMovies } from './getLastYearMovies';

export const getMostRewatchesUser = (userData) => {
  let mostRewatchesUser = null;
  let maxRewatchesCount = 0;

  // Iterate over each user's data
  for (const username in userData) {
    const diaryData = userData[username];
    const lastYearMovies = getLastYearMovies(diaryData);

    // Count rewatched movies for the current user
    let rewatchCount = 0;
    for (const movie of lastYearMovies) {
      if (movie.rewatch && movie.rewatch ===true) {
        rewatchCount++;
      }
    }

    // Update most rewatches user if this user has more rewatches
    if (rewatchCount > maxRewatchesCount) {
      maxRewatchesCount = rewatchCount;
      mostRewatchesUser = username;
    }
  }

  return mostRewatchesUser;
};
