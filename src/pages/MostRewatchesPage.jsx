import React, { useState, useEffect } from "react";
import { getMostRewatchesUser } from "../components/MostRewatches";
import { fetchMovieDetailsByName } from "../TMDBquery";
import "../styles/styles.css";

const MostRewatchesPage = ({ recentlyWatchedMovies, onClick }) => {
  const [mostRewatchesUser, setMostRewatchesUser] = useState(null);
  const [mostRewatchedMovieDetails, setMostRewatchedMovieDetails] = useState(null);
  const [posterLoaded, setPosterLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getMostRewatchesUser(recentlyWatchedMovies);
      setMostRewatchesUser(user);

      // ✅ Only try fetching poster if there is a most rewatched movie
      if (user?.title) {
        try {
          const details = await fetchMovieDetailsByName(user.title);
          setMostRewatchedMovieDetails(details);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };

    fetchData();
  }, [recentlyWatchedMovies]);

  useEffect(() => {
    if (mostRewatchedMovieDetails?.posterUrl) {
      const img = new Image();
      img.onload = () => setPosterLoaded(true);
      img.src = mostRewatchedMovieDetails.posterUrl;
    }
  }, [mostRewatchedMovieDetails]);

  return (
    <div className="rewatches-page">
      {/* User Heading */}
      {mostRewatchesUser?.username ? (
        <h2 className="rewatches-title">
                <p>They keep going back to what they know and love.</p>
s
          {mostRewatchesUser.username} left you all in the dust by rewatching{" "}
          {mostRewatchesUser.rewatchCount} {mostRewatchesUser.rewatchCount === 1 ? "movie" : "movies"}.
        </h2>
      ) : (
        <h2 className="rewatches-title">Nobody rewatched anything last year</h2>
      )}

      {/* Poster + Movie */}
      {mostRewatchedMovieDetails && (
        <FadeIn>
          <div>
            <h3>
              Their most rewatched movie was <em>{mostRewatchesUser.title}</em>
            </h3>

            <div className="poster-container">
              {mostRewatchedMovieDetails.posterUrl && (
                <img
                  src={mostRewatchedMovieDetails.posterUrl}
                  alt={`${mostRewatchesUser.title} poster`}
                  className={`centered-poster ${posterLoaded ? "loaded" : ""}`}
                />
              )}
            </div>
          </div>
        </FadeIn>
      )}

      {/*  Fallback text if there *was* a user but poster failed */}
      {!mostRewatchedMovieDetails && mostRewatchesUser?.username && (
        <p>Loading movie details...</p>
      )}


      <p>
        <button className="next-page-button" onClick={() => onClick(4)}>
          Next
        </button>
      </p>
    </div>
  );
};

const FadeIn = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fade-in ${isVisible ? "visible" : ""}`}>
      {children}
    </div>
  );
};

export default MostRewatchesPage;
