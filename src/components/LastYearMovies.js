// LastYearMovies.js
import React from 'react';
import { getLastYearMovies } from './getLastYearMovies';

const LastYearMovies = ({ username, diaryData }) => {
  const lastYearMovies = getLastYearMovies(diaryData);
  const moviesCount = lastYearMovies.length;

  return (
    <div>
      <h2>{username}'s Movies Watched in {new Date().getFullYear() - 1}:</h2>
      <p>Number of movies watched: {moviesCount}</p>
      <ul>
        {lastYearMovies.length > 0 ? (
          lastYearMovies.map((movie, index) => (
            <li key={index}>
              <strong>{movie.film_title}</strong> ({movie.release_year})<br />
              Date Watched: {movie.date_watched}<br />
              Rating: {movie.rating || 'No Rating'}<br />
              Rewatch: {movie.rewatch ? 'Yes' : 'No'}<br />
              Review: {movie.review_text}
            </li>
          ))
        ) : (
          <li>{username} doesn't seem to have watched anything recently</li>
        )}
      </ul>
    </div>
  );
};

export default LastYearMovies;
