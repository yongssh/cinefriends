// import React, { useState, useEffect } from 'react'
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import '../styles/styles.css';
// import { fetchMovieDetailsByName } from '../TMDBquery';

// const CarouselReviews = ({ data, username }) => {
//   const [movieDetails, setMovieDetails] = useState([]);

//   useEffect(() => {
//     const shuffledData = data.sort(() => 0.5 - Math.random()).slice(0, 5);

//     const fetchDetails = async () => {
//       const details = await Promise.all(
//         shuffledData.map(async (movie) => {
//           try {
//             const movieDetail = await fetchMovieDetailsByName(movie.film_title, movie.release_year);
//             return { ...movie, posterUrl: movieDetail.posterUrl };
//           } catch (error) {
//             console.error(`Error fetching details for ${movie.film_title}:`, error);

//             return { ...movie, posterUrl: '' };

//           }
//         })
//       );
//       setMovieDetails(details);
//     };

//     fetchDetails();
//   }, [data]);

//   return (
//     <div className="carousel-wrapper">
//       <h2 className="carousel-header">{username}'s Movies Watched in {new Date().getFullYear() - 1}</h2>
//       <Carousel 
//         showThumbs={false} 
//         infiniteLoop 
//         useKeyboardArrows 
//         autoPlay 
//         interval={5000} 
//         showStatus={false}
//         className="custom-carousel"
//       >
//         {movieDetails.map((entry, index) => (
//           <div key={index} className="review-slide">
//             <h3 className="carousel-title">{entry.film_title} ({entry.release_year})</h3>
            
//             {entry.posterUrl && (
//               <img
//                 src={entry.posterUrl}
//                 alt={`${entry.film_title} Poster`}
//                 className="poster-image"
//               />
//             )}

//             <div className="review-content">
//               <p><strong>Date Watched:&nbsp;</strong>{entry.date_watched}</p>
//               <p><strong>Rating:&nbsp;</strong>{entry.rating} / 5</p>
//               <p className="review-text truncate"><strong>Review:&nbsp;</strong>{entry.review_text.length > 100 ? `${entry.review_text.slice(0, 100)}...` : entry.review_text}
// </p>
//               <p className="rewatch-text">{entry.rewatch === "true" ? "Rewatch" : "First Time Watch"}</p>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default CarouselReviews;
import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import { fetchMovieDetailsByName } from '../TMDBquery';

const CarouselReviews = ({ data, username }) => {
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    const shuffledData = data.sort(() => 0.5 - Math.random()).slice(0, 5);

    const fetchDetails = async () => {
      const details = await Promise.all(
        shuffledData.map(async (movie) => {
          try {
            const movieDetail = await fetchMovieDetailsByName(movie.film_title, movie.release_year);
            return { ...movie, posterUrl: movieDetail.posterUrl };
          } catch (error) {
            console.error(`Error fetching details for ${movie.film_title}:`, error);
            return { ...movie, posterUrl: '' };
          }
        })
      );
      setMovieDetails(details);
    };

    fetchDetails();
  }, [data]);

  return (
    <div className="user-movies">
      <h2 className="carousel-header">{username}'s Movies Watched in {new Date().getFullYear() - 1}</h2>
      <div className="movie-cards">
        {movieDetails.map((entry, index) => (
          <div key={index} className="movie-card">
            <h3 className="movie-title">{entry.film_title} ({entry.release_year})</h3>
            {entry.posterUrl && (
              <img
                src={entry.posterUrl}
                alt={`${entry.film_title} Poster`}
                className="poster-image-small"
              />
            )}
            <div className="movie-info">
              <p>{entry.date_watched}</p>
              <p className="rewatch-text">{entry.rewatch === "true" ? "Rewatch" : "First Time Watch"}</p>

              <div className="rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`star ${i < entry.rating ? 'filled' : ''}`}>
                    {i < entry.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <p className="review-text truncate">
                {entry.review_text.length > 50 ? `${entry.review_text.slice(0, 50)}...` : entry.review_text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselReviews;
