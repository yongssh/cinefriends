export const getLastYearMovies = (diaryData) => {
  // make sure diaryData is an array and not empty
  if (!Array.isArray(diaryData)) {
      console.error('diaryData is not an array:', diaryData);
      return []; 
  }
  
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  console.log('Filtering movies for the year:', lastYear);

  // filter movies for last calendar year
  const filteredMovies = diaryData.filter(movie => {
      // ensure movie has a valid date_watched 
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

  // sort filtered movies by date_watched in descending order
  const sortedMovies = filteredMovies.sort((a, b) => new Date(b.date_watched) - new Date(a.date_watched));

  // convert rewatch from string to boolean 
  const convertedmovies = sortedMovies.map(movie => ({
      ...movie,
      rewatch: movie.rewatch === 'true', 
      rating: parseInt(movie.rating) || 'No Rating' 
  }));

  console.log('Movies with Rewatch and Rating:', convertedmovies);

  return convertedmovies;
};
