import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import BarChart from '../components/BarChart';  
import '../styles/styles.css';

const MoviesWatchedPage = ({ moviesCountByUser, onClick }) => {
  const [data, setData] = useState([]);
  const animationDuration = 2000;

  useEffect(() => {
    const newData = Object.keys(moviesCountByUser).map(username => ({
      username,
      count: moviesCountByUser[username]
    }));
    setData(newData);
  }, [moviesCountByUser]);

  return (
    <div>
      <h2 className="title">What You Watched Last Year</h2>
      
      <div className="align-barchart">

        {/* numbers going up */}
        <div className="countup-container">
          {data.map(({ username, count }) => (

            <div key={username} className="countup-item">
              <span className="username">{username}:</span>&nbsp;
              <CountUp className="countup-number" end={count} duration={animationDuration / 1000} separator="," />
            </div>
          ))}

        </div>
        
        {/* actual chart */}
        <div className="chart-container">
          <BarChart data={data} duration={animationDuration} />
        </div>

      <button className="next-page-button" onClick={() => onClick(2)}>Next</button>
      </div>
      
     
    </div>
  );
};

export default MoviesWatchedPage;

