import { getLastYearMovies } from './getLastYearMovies';

export const getMostRewatchesUser = (userData) => {
  let mostRewatchesUser = null;
  let maxRewatchesCount = 0;

  // iterate over each user's data
  for (const username in userData) {
    const diaryData = userData[username];
    const lastYearMovies = getLastYearMovies(diaryData);

    // count rewatched movies for the current user
    let rewatchCount = 0;
    for (const movie of lastYearMovies) {
      if (movie.rewatch) { 
        rewatchCount++;
      }
    }

    // update most rewatches user if this user has more rewatches! ha! 
    // i am sooo sure i am going to have the most rewatches in the gc
    if (rewatchCount > maxRewatchesCount) {
      maxRewatchesCount = rewatchCount;
      mostRewatchesUser = {
        username: username,
        rewatchCount: rewatchCount,
        // Assuming title is the first movie's title, so this could be an issue potentially
        title: lastYearMovies[0].film_title 
      };
    }
  }

  return mostRewatchesUser;
};
