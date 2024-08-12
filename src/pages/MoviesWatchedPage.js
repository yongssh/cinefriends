import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import BarChart from '../components/BarChart'; // Adjust the path as necessary
import '../styles/styles.css';

const MoviesWatchedPage = ({ moviesCountByUser, onClick }) => {
  const [data, setData] = useState([]);
  const animationDuration = 2000; // Animation duration in milliseconds (1 second)

  useEffect(() => {
    const newData = Object.keys(moviesCountByUser).map(username => ({
      username,
      count: moviesCountByUser[username]
    }));
    setData(newData);
  }, [moviesCountByUser]);

  return (
    <div>
      <h2>Movies watched last year</h2>
      <div className="align-barchart">
        <div className="countup-container">
          {data.map(({ username, count }) => (
            <div key={username} className="countup-item">
              {username}:&nbsp;
              <CountUp key={username} end={count} duration={animationDuration / 1000} separator="," />
            </div>
          ))}
        </div>
        <BarChart data={data} duration={animationDuration} />
      </div>
      <p>
        <button className="next-page-button" onClick={() => onClick(2)}>Next</button>
      </p>
    </div>
  );
};

export default MoviesWatchedPage;
