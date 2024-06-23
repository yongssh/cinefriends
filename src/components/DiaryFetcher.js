import React, { useState } from 'react';
import { fetchDiary } from './diaryscraper';

// component that calls handleFetch DIaries

const DiaryFetcher = ({ onDiariesFetched }) => {
  const [usernames, setUsernames] = useState('');
  const [results, setResults] = useState([]);

  const handleFetchDiaries = async () => {
    try {
      const usernamesArray = usernames.split(',').map(username => username.trim());
      const fetchPromises = usernamesArray.map(username => fetchDiary(username));
      const diaries = await Promise.all(fetchPromises);

      const processedResults = diaries.map(diary => {
        const { entries } = diary;
        return { username: diary.username, entries }; // Adjust to include all needed info
      });

      setResults(processedResults);
      onDiariesFetched(processedResults); // Pass results up to the parent component
    } catch (error) {
      console.error('Error fetching diaries:', error);
    }
  };

  return (
    <div>
      <h1>Letterboxd Diary Fetcher</h1>
      <textarea
        placeholder="Enter up to 5 usernames separated by commas"
        value={usernames}
        onChange={(e) => setUsernames(e.target.value)}
        style={{ width: '100%', minHeight: '100px' }}
      />
      <br />
      <button onClick={handleFetchDiaries}>Fetch Diaries</button>

      {results.map((result, index) => (
        <div key={index}>
          <h3>Results for Username {result.username}:</h3>
          <p>Total Movies Watched: {result.entries.length}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryFetcher;