import React from 'react';
import '../styles/styles.css';

const TitlePage = ({ usernamesInput, setUsernamesInput, handleFetchData, onClick, fetchedData, loading }) => {
  return (
    <div>
      <h1>So you're friends who like movies.<br/>Let's see who the real cinephile is.</h1>
      <div className="input-container">
        <input
          type="text"
          value={usernamesInput}
          onChange={(e) => setUsernamesInput(e.target.value)}
          placeholder="Enter usernames separated by commas"
        />
        <button onClick={handleFetchData} disabled={loading}>
          {loading ? 'Fetching Data...' : 'Fetch Data'}
        </button>
      </div>
      {loading && <p className="loading">“Difficult to see. Always in motion is the future.”<br></br>–Yoda</p>}
      {fetchedData && (
        <p>
          <button className="next-page-button" onClick={() => onClick(0)}>Next: Movies Watched</button>
        </p>
      )}
    </div>
  );
};

export default TitlePage;
