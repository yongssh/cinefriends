import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/styles.css';
import { fetchMovieDetailsByName } from '../TMDBquery';

const CarouselReviews = ({ data, username }) => {
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    // Shuffle and slice data to get 5 random reviews
    const shuffledData = data.sort(() => 0.5 - Math.random()).slice(0, 5);

    const fetchDetails = async () => {
      const details = await Promise.all(
        shuffledData.map(async (movie) => {
          try {
            const movieDetail = await fetchMovieDetailsByName(movie.film_title, movie.release_year);
            return { ...movie, posterUrl: movieDetail.posterUrl };
          } catch (error) {
            console.error(`Error fetching details for ${movie.film_title}:`, error);
            //  if no poster is found, fall back
            return { ...movie, posterUrl: '' }; d
          }
        })
      );
      setMovieDetails(details);
    };

    fetchDetails();
  }, [data]);

  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
        {movieDetails.map((entry, index) => (
          <div key={index} className="review-slide">
            <h3 className='carousel-title'>{entry.film_title} ({entry.release_year})</h3>
            {entry.posterUrl && (
              <img
                src={entry.posterUrl}
                alt={`${entry.film_title} Poster`}
                style={{ width: '200px', height: 'auto' }}
              />
            )}
            <p>Logged on&nbsp;<strong>{entry.date_watched}</strong></p>
            <p><strong>Rating:&nbsp; </strong>{entry.rating} / 5</p>
            <p><strong>Review:&nbsp; </strong>"{entry.review_text}"</p>
            <p className='rewatch-text'>{entry.rewatch === "true" ? "Rewatch" : "First Time Watch"}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselReviews;
