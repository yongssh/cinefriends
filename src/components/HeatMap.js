import React, { useEffect, useRef } from 'react';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import Legend from 'cal-heatmap/plugins/Legend';
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
import '../styles/styles.css'
dayjs.extend(localeData);

const HeatMap = ({ movies, username }) => {
  const calHeatmapRef = useRef(null);

  useEffect(() => {
    if (!calHeatmapRef.current) {
      calHeatmapRef.current = new CalHeatmap();
    }

    const cal = calHeatmapRef.current;

    // Aggregate movies by date_watched
    const movieCounts = {};
    
    movies.forEach(movie => {
      const date = dayjs(movie.date_watched).format('YYYY-MM-DD');
      if (!movieCounts[date]) {
        movieCounts[date] = 0;
      }
      movieCounts[date] += 1; // Count each movie individually
    });

    const formattedMovies = Object.keys(movieCounts).map(date => ({
      date_watched: new Date(date),
      count: movieCounts[date],
    }));

    cal.paint(
      {
        data: {
          source: formattedMovies,
          type: 'json',
          x: 'date_watched',
          y: 'count',
        },
        date: { start: new Date(`${new Date().getFullYear() - 1}-01-01`) },
        range: 1,
        scale: {
          color: {
            interpolate: 'hsl',
            type: 'threshold',
            // mmmm do i like these colors? but they match
            range: ['#fff','#aaebc2', '#00A85D','#0b7131','#065724'], 
            domain: [1, 2, 3, 4, 5],
          },
        },
        domain: {
          type: 'year',
          label: { text: null },
        },
        subDomain: { type: 'day', radius: 2 },
        itemSelector: `#heatmap-${username}`,
      },
      [
        [
          Tooltip,
          {
            text: function (date, value, dayjsDate) {
              const movieText = value === 1 ? 'movie' : 'movies';
              return (
                (value ? value + ' ' + movieText : 'No data') + ' on ' + dayjsDate.format('LL')
              );
            },
          },
        ],
        [
          Legend,
          {
            tickSize: 0,
            width: 150,
            itemSelector: `#heatmap-legend-${username}`,
            label: 'Movies watched',
          },
        ],
        [
          CalendarLabel,
          {
            width: 30,
            textAlign: 'start',
            text: () => dayjs().localeData().weekdaysShort().map((d, i) => (i % 2 === 0 ? '' : d)),
          },
        ],
      ]
    );

    return () => {
      cal.destroy(); 
    };
  }, [movies, username]);

  return (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <div id={`heatmap-${username}`} style={{ display: 'inline-block', margin: '5px', padding: '5px'}} className="margin-bottom--md"></div>
      <div id={`heatmap-legend-${username}`} style={{ display: 'inline-block', margin: '5px', padding: '5px' }}></div>
    </div>
  );
};

export default HeatMap;
