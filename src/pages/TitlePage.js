import React, { useState } from 'react';
import '../styles/styles.css';
// import TestFetchPage from '../TestFetchPage';

const TitlePage = ({ usernamesInput, setUsernamesInput, handleFetchData, onClick, fetchedData, loading }) => {
  const [buttonPressed, setButtonPressed] = useState(false);

  const usernames = usernamesInput.split(',').map(username => username.trim());

  // Check if there are at least 2 usernames entered
  const canProceed = usernames.length > 1;

  const handleButtonClick = () => {
    if (usernamesInput.trim() === '' || usernames.length < 2) {
      setButtonPressed(true); // Set button pressed state
      return;
    }

    if (canProceed) {
      handleFetchData();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div>
      <h1>So you're friends who like movies.<br/>Let's see who the real cinephile is.</h1>
      <div className="input-container">

        <input
          type="text"
          value={usernamesInput}
          onChange={(e) => setUsernamesInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Letterboxd usernames separated by commas"
        />
        <button onClick={handleButtonClick} disabled={loading}>
          {loading ? 'Fetching Data...' : 'Fetch Data'}
        </button>

      </div>
      {loading && <p className="loading">“Difficult to see. Always in motion is the future.”<br/>–Yoda</p>}
      {fetchedData && (
        <div>
          <p>Start exploring your data from last year, and see just how well you stack up against each other.</p>
          <p>
            <button className="next-page-button" onClick={() => onClick(0)}>Begin</button>
          </p>
        </div>
      )}
      {(buttonPressed && usernamesInput.trim() === '') && <p className="warning">Please enter at least one username.</p>}
      {(buttonPressed && usernames.length < 2) && <p className="warning">You must input more than 1 username.</p>}
    </div>
  );
};

export default TitlePage;
