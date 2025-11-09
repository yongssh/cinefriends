import { getLastYearMovies } from "./getLastYearMovies";

export const getMostRewatchesUser = (userData) => {
  let mostRewatchesUser = null;
  let maxRewatchesCount = 0;

  for (const username in userData) {
    const lastYearMovies = getLastYearMovies(userData[username]);

    const rewatchMap = {};

    lastYearMovies.forEach((movie) => {
      if (movie.rewatch === true || movie.rewatch === "true") {
        rewatchMap[movie.film_title] = (rewatchMap[movie.film_title] || 0) + 1;
      }
    });

    const titles = Object.keys(rewatchMap);
    if (titles.length === 0) continue;

    const [topMovieTitle, userRewatchCount] = Object.entries(rewatchMap).sort(
      (a, b) => b[1] - a[1]
    )[0];

    if (userRewatchCount > maxRewatchesCount) {
      maxRewatchesCount = userRewatchCount;
      mostRewatchesUser = {
        username,
        rewatchCount: userRewatchCount,
        title: topMovieTitle,
      };
    }
  }

  // Always return an object so React can display something
  return (
    mostRewatchesUser || {
      username: null,
      rewatchCount: 0,
      title: null,
    }
  );
};
