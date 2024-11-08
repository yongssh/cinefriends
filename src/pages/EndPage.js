import React from 'react';
import '../styles/styles.css';
const EndPage = ({ onClick }) => {
  return (
    <div className="end-page">
      <h1 className="end-text">We hope you and your friends enjoyed this experience. <br></br>Come back next year for more. </h1>
      <p className="end-info"> This project was inspired by my favorite movie group chat. You know who you are.</p>
      <p>
        <button className="next-page-button" onClick={() => onClick(-1)}>Try again with other friends</button>
      </p>
    </div>
  );
};

export default EndPage;
