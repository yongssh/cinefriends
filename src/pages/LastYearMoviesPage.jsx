import React, { useEffect, useRef, useState } from "react";
import { getLastYearMovies } from "../components/getLastYearMovies";
import CarouselReviews from "../components/CarouselReviews";
import html2canvas from "html2canvas";
import "../styles/styles.css";

const LastYearMoviesPage = ({ recentlyWatchedMovies, onClick }) => {
  const exportSection = useRef(null);
  const [showGrid, setShowGrid] = useState(false);

  // fade text then reveal grid
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGrid(true);
      exportSection.current.scrollIntoView({ behavior: "smooth" });
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const handleExport = () => {
    html2canvas(exportSection.current, {
      backgroundColor: "#101010",
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `last-year-movies.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="movie-png-page">

      <h1 className="fade-in title-main">Life is in the details.</h1>
      <h2 className="fade-in-delay subtitle">Let's take a look at some of the highlights.</h2>


      {/* MOVIE GRID */}
      <div className={`user-grid ${showGrid ? "visible" : "hidden"}`} ref={exportSection}>
        {Object.keys(recentlyWatchedMovies).map((username) => {
const userMovies = getLastYearMovies(recentlyWatchedMovies[username]);

          return (
            <div key={username} className="user-column">
              <CarouselReviews data={userMovies} username={username} />
            </div>
            
          );
        })}
        
      </div>
              <button className="next-page-button" onClick={() => onClick(2)}>Next</button>

    </div>
    
    
  );
};

export default LastYearMoviesPage;
