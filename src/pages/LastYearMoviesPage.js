import React from 'react';
import { getLastYearMovies } from '../components/getLastYearMovies';
import HeatMap from '../components/HeatMap';
import CarouselReviews from '../components/CarouselReviews';
import GenrePieChart from '../components/GenrePieChart';

const LastYearMoviesPage = ({ recentlyWatchedMovies, onClick }) => {
  return (
    <div>
      <h2>Life is in the details. So let's take a look.</h2>
      {Object.keys(recentlyWatchedMovies).map(username => {
        const userMovies = getLastYearMovies(recentlyWatchedMovies[username]);
        return (
          <div key={username}>
            <h2>Let's take a look at some of {username}'s highlights</h2>
            <h3>{username}'s Movies Watched in {new Date().getFullYear() - 1}:</h3>
            <HeatMap username={username} movies={userMovies} />
            <div style={{ maxWidth: '80vw', margin: '0 auto' }}>
              <CarouselReviews data={userMovies} username={username} />
   
            </div>
            <p>
              <button className="next-page-button" onClick={() => onClick(2)}>Next</button>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default LastYearMoviesPage;
