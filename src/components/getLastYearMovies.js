// getLastYearMovies.js

export const getLastYearMovies = (diaryData) => {
  // Ensure diaryData is an array and not empty
  if (!Array.isArray(diaryData)) {
      console.error('diaryData is not an array:', diaryData);
      return []; // Return empty array or handle error appropriately
  }
  
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  console.log('Filtering movies for the year:', lastYear);

  // Filter movies for last year
  const filteredMovies = diaryData.filter(movie => {
      // Ensure movie has a valid date_watched property
      if (!movie.date_watched) {
          console.error('Invalid movie data - missing date_watched:', movie);
          return false;
      }
      
      const movieDate = new Date(movie.date_watched);
      const movieYear = movieDate.getFullYear();
      console.log(`Movie: ${movie.film_title}, Date Watched: ${movie.date_watched}`);
      return movieYear === lastYear;
  });

  console.log('Filtered Movies:', filteredMovies);

  // Sort filtered movies by date_watched in descending order
  const sortedMovies = filteredMovies.sort((a, b) => new Date(b.date_watched) - new Date(a.date_watched));

  // Convert rewatch from string to boolean where applicable
  const convertedmovies = sortedMovies.map(movie => ({
      ...movie,
      rewatch: movie.rewatch === 'true', // Assuming rewatch is a string 'true' or 'false'
      rating: parseInt(movie.rating) || 'No Rating' // Convert rating to integer, handle NaN with fallback
  }));

  console.log('Movies with Rewatch and Rating:', convertedmovies);

  return convertedmovies;
};
