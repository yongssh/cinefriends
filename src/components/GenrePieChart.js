import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchMovieDetailsByName } from '../TMDBQuery'; // Assuming this is the correct import path
const GenrePieChart = ({ movies }) => {
  const [genreData, setGenreData] = useState({ labels: [], data: [] });

  useEffect(() => {
    if (!movies || movies.length === 0) return; // Exit early if movies is undefined or empty

    const fetchGenres = async () => {
      try {
        const genreCounts = {};

        await Promise.all(movies.forEach(async movie => {
          try {
            const movieDetails = await fetchMovieDetailsByName(movie.film_title, movie.release_year);
            movieDetails.genres.split(', ').forEach(genre => {
              genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
          } catch (error) {
            console.error(`Error fetching details for ${movie.film_title}:`, error);
          }
        }));

        const chartData = {
          labels: Object.keys(genreCounts),
          datasets: [
            {
              data: Object.values(genreCounts),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Add more colors as needed
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
          ],
        };

        setGenreData(chartData);
      } catch (error) {
        console.error('Error fetching genre data:', error);
      }
    };

    fetchGenres();
  }, [movies]); // Ensure useEffect runs when movies changes

  if (!movies || movies.length === 0) {
    return <div>No movies data available.</div>;
  }

  return (
    <div>
      <h3>Genres Distribution</h3>
      <Pie data={genreData} />
    </div>
  );
};

export default GenrePieChart;
