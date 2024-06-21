import React from 'react';
import { getLastYearMovies } from '../components/getLastYearMovies';
import '../styles/styles.css';
const LastYearMoviesPage = ({ recentlyWatchedMovies, onClick }) => {
  return (
    <div>
      <h2>Movies Watched Last Year:</h2>
      <p>
        <button className="next-page-button" onClick={() => onClick(2)}>Next: Most Rewatches</button>
      </p>
      {Object.keys(recentlyWatchedMovies).map((username) => (
        <div key={username}>
          <h3>{username}'s Movies Watched in {new Date().getFullYear() - 1}:</h3>
          <ul>
            {getLastYearMovies(recentlyWatchedMovies[username]).map((movie, index) => (
              <li key={index}>
                <strong>{movie.film_title}</strong> ({movie.release_year})<br />
                Date Watched: {movie.date_watched}<br />
                Rating: {movie.rating || 'No Rating'}<br />
                Rewatch: {movie.rewatch ? 'Yes' : 'No'}<br />
                Review: {movie.review_text}
              </li>
            ))}
          </ul>
        </div>
      ))}
      
    </div>
  );
};

export default LastYearMoviesPage;