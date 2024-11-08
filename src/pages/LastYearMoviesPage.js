import React from 'react';
import { getLastYearMovies } from '../components/getLastYearMovies';
import CarouselReviews from '../components/CarouselReviews';


const LastYearMoviesPage = ({ recentlyWatchedMovies, onClick }) => {

  return (
    <div className="last-year-movie-page">
      {/* <h2 className="life-in-details">Life is in the details.</h2>
      <h2>Let's take a look at some of the highlights</h2> */}

      
      {Object.keys(recentlyWatchedMovies).map(username => {
        const userMovies = getLastYearMovies(recentlyWatchedMovies[username]);

        return (
          <div key={username}>
            
            <div className="carousel-container">
              <CarouselReviews data={userMovies} username={username} />
            </div>
            
          </div>
        );
      })}<p>
       <button className="next-page-button" onClick={() => onClick(2)}>Next</button>
       </p>
    </div>
  );
};

export default LastYearMoviesPage;
