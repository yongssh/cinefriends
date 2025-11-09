export const getLastYearMovies = (diaryData) => {

  // check diaryData is an array, NOT empty
  if (!Array.isArray(diaryData)) {
    console.error('diaryData is not an array:', diaryData);
    return [];
  }

  console.log('Filtering movies watched within last 12 months');

  const now = new Date();
  const cutoffDate = new Date();
  // rolling 12 months
  cutoffDate.setFullYear(now.getFullYear() - 1); 

  const filteredMovies = diaryData.filter(movie => {
    if (!movie.date_watched) {
      console.error('Invalid movie data - missing date_watched:', movie);
      return false;
    }

    const watchedDate = new Date(movie.date_watched);

    if (isNaN(watchedDate.getTime())) {
      console.error('Invalid date format in diary data:', movie.date_watched);
      return false;
    }

    console.log(`Movie: ${movie.film_title}, Date Watched: ${movie.date_watched}`);

    return watchedDate >= cutoffDate; 
  });

  console.log('Filtered Movies:', filteredMovies);

  // sort filtered movies by date_watched descending (most recent first)
  const sortedMovies = filteredMovies.sort(
    (a, b) => new Date(b.date_watched) - new Date(a.date_watched)
  );

  // convert rewatch to boolean, rating to number
  const convertedMovies = sortedMovies.map(movie => ({
    ...movie,
    rewatch: movie.rewatch === 'true',
    rating: movie.rating && !isNaN(movie.rating) ? parseInt(movie.rating) : 'No Rating'
  }));

  console.log('Movies with Rewatch and Rating:', convertedMovies);

  return convertedMovies;
};
