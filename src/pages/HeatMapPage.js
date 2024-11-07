// import React from 'react';
// import { getLastYearMovies } from '../components/getLastYearMovies';
// import HeatMap from '../components/HeatMap';

// const HeatMapPage = ({ recentlyWatchedMovies, onClick }) => {
//   return (
//     <div className="heat-map-page">
//       <h2 style={{ color: '#ff8000' }}>Life moves pretty fast. When did you stop to look around?</h2>
//       {Object.keys(recentlyWatchedMovies).map(username => {
//         const userMovies = getLastYearMovies(recentlyWatchedMovies[username]);
//         return (
//           <div key={username}>
//             <h2 style={{ color: '#00A85D' }} className="heat-map-heading">When {username} Watched in {new Date().getFullYear() - 1}:</h2>
//             <HeatMap username={username} movies={userMovies} />
//           </div>
//         );
//       })}
//       <p>
//         <button className="next-page-button" onClick={() => onClick(5)}>Next</button>
//       </p>
//     </div>
//   );
// };

// export default HeatMapPage;
import React from 'react';
import { getLastYearMovies } from '../components/getLastYearMovies';
import HeatMap from '../components/HeatMap';

const HeatMapPage = ({ recentlyWatchedMovies, onClick }) => {
  return (
    <div className="heat-map-page">
      <h2 style={{ color: '#ff8000' }}>
        Life moves pretty fast. When did you stop to look around?
      </h2>
      {Object.keys(recentlyWatchedMovies).map((username) => {
        const userMovies = getLastYearMovies(recentlyWatchedMovies[username]);
        return (
          <div key={username}>
            <h2 style={{ color: '#00A85D' }} className="heat-map-heading">
              When {username} watched in {new Date().getFullYear() - 1}:
            </h2>
            <div className="heat-map-container">
              <div className="heat-map-wrapper">
                <HeatMap username={username} movies={userMovies} />
              </div>
            </div>
          </div>
        );
      })}
      <p>
        <button className="next-page-button" onClick={() => onClick(5)}>
          Next
        </button>
      </p>
    </div>
  );
};

export default HeatMapPage;
