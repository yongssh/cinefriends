import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3'; // Import D3
import { getLastYearMovies } from '../components/getLastYearMovies';
import '../styles/styles.css'; // Import your CSS file

const Heatmap = ({ recentlyWatchedMovies }) => {
  const svgRef = useRef(null);
  const lastYear = new Date().getFullYear() - 1;

  useEffect(() => {
    const movies = Object.values(recentlyWatchedMovies).flatMap(getLastYearMovies); // Flatten and get movies
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3,
      'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7,
      'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    const dateCounts = {};
    movies.forEach((movie) => {
      const [day, month, year] = movie.date_watched.split(' ');
      const monthIndex = monthMap[month];
      if (monthIndex !== undefined && !isNaN(day) && !isNaN(year)) {
        const date = new Date(year, monthIndex, day);
        if (date.getFullYear() === lastYear && !isNaN(date.getTime())) {
          const isoDate = date.toISOString().split('T')[0];
          dateCounts[isoDate] = (dateCounts[isoDate] || 0) + 1;
        } else {
          console.error(`Invalid date: ${day} ${month} ${year}`);
        }
      } else {
        console.error(`Invalid date components: ${day} ${month} ${year}`);
      }
    });

    const heatmapData = [];
    const startDate = new Date(lastYear, 0, 1);
    const endDate = new Date(lastYear, 11, 31);
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const isoDate = currentDate.toISOString().split('T')[0];
      const count = dateCounts[isoDate] || 0;
      heatmapData.push({ date: isoDate, count });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // D3 code to render heatmap
    const svg = d3.select(svgRef.current);

    const cellSize = 20;
    const width = 800; // Adjust as needed
    const height = 400; // Adjust as needed

    svg.attr('width', width)
       .attr('height', height);

    const colorScale = d3.scaleSequential()
                        .domain([0, d3.max(heatmapData, d => d.count)])
                        .interpolator(d3.interpolateBlues);

    svg.selectAll('rect')
       .data(heatmapData)
       .enter().append('rect')
         .attr('x', d => new Date(d.date).getDate() * cellSize)
         .attr('y', d => new Date(d.date).getMonth() * cellSize)
         .attr('width', cellSize)
         .attr('height', cellSize)
         .attr('fill', d => colorScale(d.count));

  }, [recentlyWatchedMovies, lastYear]);

  return (
    <div className="heat-map-container">
      <h2>Movies Watched Last Year</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Heatmap;
