import React, { useState } from 'react';
import { invokeLambdaFunction } from './lambdaInvoker';
import LastYearMovies from './components/LastYearMovies';
import { getMostReviewsUser } from './components/MostReviews'; // Import getMostReviewsUser function
import { getMostRewatchesUser } from './components/MostRewatches'; // Import getMostRewatchesUser function
import { getLastYearMovies } from './components/getLastYearMovies'; // Import getLastYearMovies function
import './styles/styles.css';

const App = () => {
  const [usernamesInput, setUsernamesInput] = useState('');
  const [recentlyWatchedMovies, setRecentlyWatchedMovies] = useState({});

  const handleFetchData = async () => {
    try {
      const usernamesArray = usernamesInput.split(',').map(username => username.trim());
      let allTopMovies = {};

      for (const username of usernamesArray) {
        const response = await invokeLambdaFunction(username);

        if (response && response.statusCode === 200) {
          const { body } = response;
          const diaryData = JSON.parse(body);

          if (Array.isArray(diaryData)) {
            allTopMovies[username] = diaryData;
          } else {
            console.error(`Invalid data format for ${username}:`, diaryData);
            allTopMovies[username] = [];
          }
        } else {
          console.error(`Failed to fetch data for ${username}`);
          allTopMovies[username] = [];
        }
      }

      setRecentlyWatchedMovies(allTopMovies);
      console.log('All top movies:', allTopMovies);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setUsernamesInput(event.target.value);
  };

  // Function to get the total number of movies watched for each user
  const getMoviesCountByUser = (userData) => {
    const moviesCount = {};
    for (const username in userData) {
      moviesCount[username] = getLastYearMovies(userData[username]).length;
    }
    return moviesCount;
  };

  // Call the function to get movies count by user
  const moviesCountByUser = getMoviesCountByUser(recentlyWatchedMovies);

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          value={usernamesInput}
          onChange={handleInputChange}
          placeholder="Enter usernames separated by commas"
        />
        <button onClick={handleFetchData}>Fetch Data</button>
      </div>
      <div>
        {Object.keys(recentlyWatchedMovies).map(username => (
          <React.Fragment key={username}>
            <LastYearMovies username={username} diaryData={recentlyWatchedMovies[username]} />
          </React.Fragment>
        ))}
      </div>
      <div>
        <h2>User with the Most Reviews:</h2>
        <p>{getMostReviewsUser(recentlyWatchedMovies)}</p>
      </div>
      <div>
        <h2>User with the Most Rewatches:</h2>
        <p>{getMostRewatchesUser(recentlyWatchedMovies)}</p>
      </div>
      <div>
        <h2>Movies Watched Count:</h2>
        <ul>
          {Object.keys(moviesCountByUser).map(username => (
            <li key={username}>{username}: {moviesCountByUser[username]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
