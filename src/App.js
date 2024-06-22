import React, { useState } from 'react';
import { invokeLambdaFunction } from './lambdaInvoker';
import TitlePage from './pages/TitlePage';
import MoviesWatchedPage from './pages/MoviesWatchedPage';
import LastYearMoviesPage from './pages/LastYearMoviesPage';
import MostRewatchesPage from './pages/MostRewatchesPage';
import MostReviewsPage from './pages/MostReviewsPage';
import EndPage from './pages/EndPage';
import HeatMapPage from './pages/HeatMapPage'; // Import HeatMapPage
import { getLastYearMovies } from './components/getLastYearMovies';
import './styles/styles.css';
import './App.css';

const App = () => {
  const [usernamesInput, setUsernamesInput] = useState('');
  const [recentlyWatchedMovies, setRecentlyWatchedMovies] = useState({});
  const [pageIndex, setPageIndex] = useState(-1); // Initial page index, -1 for title page
  const [loading, setLoading] = useState(false); // Loading state
  const [fetchedData, setFetchedData] = useState(false); // Checks if username data has been fetched from lambda

  const handleFetchData = async () => {
    try {
      setLoading(true); // Set loading to true when fetch starts
      setFetchedData(false); // Reset fetchedData to false when fetch starts
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
      setFetchedData(true); // Set fetchedData to true when fetch completes successfully
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when fetch completes
    }
  };

  const resetApp = () => {
    setUsernamesInput('');
    setRecentlyWatchedMovies({});
    setPageIndex(-1);
    setLoading(false);
    setFetchedData(false);
  };

  const getMoviesCountByUser = (userData) => {
    const moviesCount = {};
    for (const username in userData) {
      moviesCount[username] = getLastYearMovies(userData[username]).length;
    }
    return moviesCount;
  };

  if (pageIndex === -1) {
    return (
      <TitlePage
        onClick={() => setPageIndex(0)}
        usernamesInput={usernamesInput}
        setUsernamesInput={setUsernamesInput}
        handleFetchData={handleFetchData}
        fetchedData={fetchedData}
        loading={loading}
      />
    );
  } else if (pageIndex === 0) {
    return (
      <MoviesWatchedPage
        onClick={() => setPageIndex(1)}
        moviesCountByUser={getMoviesCountByUser(recentlyWatchedMovies)}
      />
    );
  } else if (pageIndex === 1) {
    return (
      <LastYearMoviesPage
        onClick={() => setPageIndex(2)}
        recentlyWatchedMovies={recentlyWatchedMovies}
      />
    );
  } else if (pageIndex === 2) {
    return (
      <MostRewatchesPage
        onClick={() => setPageIndex(3)}
        recentlyWatchedMovies={recentlyWatchedMovies}
      />
    );
  } else if (pageIndex === 3) {
    return (
      <MostReviewsPage
        onClick={() => setPageIndex(4)}
        recentlyWatchedMovies={recentlyWatchedMovies}
      />
    );
  } else if (pageIndex === 4) {
    return (
      <HeatMapPage
        onClick={() => setPageIndex(5)} // Navigate to pageIndex 5 (EndPage)
        recentlyWatchedMovies={recentlyWatchedMovies}
      />
    );
  } else if (pageIndex === 5) {
    return (
      <EndPage
        onClick={resetApp} // Reset the app
        recentlyWatchedMovies={recentlyWatchedMovies}
      />
    );
  } else {
    return <div>Page Not Found</div>; // Handle unexpected pageIndex values
  }
};

export default App;
