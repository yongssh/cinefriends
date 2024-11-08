import React, { useState } from 'react';
import { invokeLambdaFunction } from './lambdaInvoker';
import TitlePage from './pages/TitlePage';
import MoviesWatchedPage from './pages/MoviesWatchedPage';
import LastYearMoviesPage from './pages/LastYearMoviesPage';
import MostRewatchesPage from './pages/MostRewatchesPage';
import MostReviewsPage from './pages/MostReviewsPage';
import EndPage from './pages/EndPage';
import HeatMapPage from './pages/HeatMapPage'; 
import { getLastYearMovies } from './components/getLastYearMovies';
import './styles/styles.css';
import './App.css';

const App = () => {
  const [usernamesInput, setUsernamesInput] = useState('');
  const [recentlyWatchedMovies, setRecentlyWatchedMovies] = useState({});

  // initial page index, -1 for title page
  const [pageIndex, setPageIndex] = useState(-1); 
  const [loading, setLoading] = useState(false); 
  // check if username data has been fetched from lambda
  const [fetchedData, setFetchedData] = useState(false); 

  const handleFetchData = async () => {
    try {
      // set loading to true when fetch starts
      setLoading(true);
      // reset fetchedData to false 
      setFetchedData(false); 
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
      //console.log('All top movies:', allTopMovies);
      // set fetchedData to true when fetch completes successfully
      setFetchedData(true); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Set loading to false when fetch completes
      setLoading(false); 
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
    // goes to end page!
        onClick={() => setPageIndex(5)}
        recentlyWatchedMovies={recentlyWatchedMovies}
      />
    );
  } else if (pageIndex === 5) {
    return (
      <EndPage
        onClick={resetApp} 
        recentlyWatchedMovies={recentlyWatchedMovies}
      />
    );
  } else {
    return <div>Page Not Found</div>; 
  }
};

export default App;
