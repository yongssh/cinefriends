import React from 'react';
import CountUp from 'react-countup';
import BarChart from '../components/BarChart'; // Adjust the path as necessary
import '../styles/styles.css';

const MoviesWatchedPage = ({ moviesCountByUser, onClick }) => {
  const data = Object.keys(moviesCountByUser).map(username => ({
    username,
    count: moviesCountByUser[username]
  }));

  return (
    <div>
      <h2>Movies watched last year</h2>
      <ul>
        {Object.keys(moviesCountByUser).map((username) => (
          <li key={username}>
            {username}: <CountUp end={moviesCountByUser[username]} duration={5} separator="," />
          </li>
        ))}
      </ul>
      <BarChart className="align-barchart" data={data} />
      <p>
        <button className="next-page-button" onClick={() => onClick(2)}>Next: Last Year's Movies</button>
      </p>
    </div>
  );
};

export default MoviesWatchedPage;
