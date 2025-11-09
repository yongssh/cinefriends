import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import "../styles/styles.css";
import { fetchMovieDetailsByName } from "../TMDBquery";

const CarouselReviews = ({ data, username }) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const exportRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  const totalMoviesWatched = data?.length || 0;

  const averageRating =
    totalMoviesWatched > 0
      ? (
        data.reduce((sum, m) => sum + (parseFloat(m.rating) || 0), 0) /
        totalMoviesWatched
      ).toFixed(1)
      : null;

  useEffect(() => {
    if (!data || data.length === 0) return;

    const sortedData = [...data]
      .map((movie) => ({
        ...movie,
        rating: parseFloat(movie.rating) || 0,
        reviewText: movie.review || "",
      }))
      .sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewText.length - a.reviewText.length;
      })
      .slice(0, 5);

    const fetchDetails = async () => {
      const details = await Promise.all(
        sortedData.map(async (movie) => {
          try {
            const movieDetail = await fetchMovieDetailsByName(
              movie.film_title,
              movie.release_year
            );
            return { ...movie, posterUrl: movieDetail.posterUrl };
          } catch (error) {
            console.error(`Poster fetch failed: ${movie.film_title}`);
            return { ...movie, posterUrl: "" };
          }
        })
      );

      setMovieDetails(details);
    };

    fetchDetails();
  }, [data]);

const exportAsPNG = () => {
  if (!exportRef.current) return;

  htmlToImage.toPng(exportRef.current, {
    cacheBust: true,           
    backgroundColor: "#101010", 
  })
  .then((dataUrl) => {
    const link = document.createElement("a");
    link.download = `${username}-top-movies.png`;
    link.href = dataUrl;
    link.click();
  })
  .catch((err) => {
    console.error("PNG export failed", err);
  });
};

  return (
    <div className="user-movies">
      <div className="movie-cards" ref={exportRef}>
        {/*  Summary Card */}
        <div className="summary-card">
          <h2>{username}</h2>
          <p className="summary-number">{totalMoviesWatched}</p>
          <p className="summary-label">movies watched last year</p>

          {averageRating && (
            <>
              <hr />
              <p className="summary-number">{averageRating}</p>
              <p className="summary-label">avg rating</p>
            </>
          )}
        </div>

        {/* Movie cards */}
        {movieDetails.map((entry, index) => (
          <div key={index} className="movie-card">
            <h3 className="movie-title">{entry.film_title}</h3>

            {entry.posterUrl && (
              <img src={entry.posterUrl} alt="poster" className="poster-image-small"  referrerPolicy="no-referrer"/>
            )}

            <div className="date-stars-row">
              <span className="movie-date">{formatDate(entry.date_watched)}</span>
              |
              <span className="rating-inline">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`star ${i + 1 <= entry.rating ? "filled" : ""}`}>
                    ★
                  </span>
                ))}
              </span>
            </div>


            <p className="review-text">
              {entry.reviewText?.slice(0, 60) + " ..." ?? "No review"}
            </p>
          </div>
        ))}
      </div>

      <button className="export-btn" onClick={exportAsPNG}>
        Export as PNG
      </button>
    </div>
  );
};

export default CarouselReviews;
