import React, { useEffect, useRef } from "react";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import Legend from "cal-heatmap/plugins/Legend";
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";
import "../styles/styles.css";

dayjs.extend(localeData);

const HeatMap = ({ movies, username }) => {
  const calHeatmapRef = useRef(null);

useEffect(() => {
  if (!calHeatmapRef.current) {
    calHeatmapRef.current = new CalHeatmap();
  }

  const cal = calHeatmapRef.current;

  const movieCounts = {};

  movies.forEach((movie) => {
    const date = dayjs(movie.date_watched).format("YYYY-MM-DD");
    movieCounts[date] = (movieCounts[date] || 0) + 1;
  });

  const formattedMovies = Object.keys(movieCounts).map((date) => ({
    date_watched: new Date(date).getTime(),
    count: movieCounts[date],
  }));

  const oneYearAgo = dayjs().subtract(1, "year").startOf("day").toDate();

  cal.paint(
    {
      itemSelector: `#heatmap-${username}`,
      data: {
        source: formattedMovies,
        type: "json",
        x: "date_watched",
        y: "count",
      },

      date: { start: oneYearAgo },
      range: 13, // last 12 months + current partial month

      domain: {
        type: "month",
        gutter: 4,
      },

      subDomain: {
        type: "day",
        radius: 3,
        width: 13,
        height: 13,
      },

      scale: {
        color: {
          type: "threshold",
          range: ["#fff", "#aaebc2", "#00A85D", "#0b7131", "#065724"],
          domain: [1, 2, 3, 4, 5],
        },
      },
    },
    [
      [
        Tooltip,
        {
          text: (date, value, dayjsDate) =>
            value
              ? `${value} movie${value > 1 ? "s" : ""} on ${dayjsDate.format("LL")}`
              : "No movies",
        },
      ],
      [
        Legend,
        {
          width: 150,
          itemSelector: `#heatmap-legend-${username}`,
          label: "Movies watched",
        },
      ],
      [
        CalendarLabel,
        {
            position: "top",
    text: () =>
      dayjs.monthsShort(), // ✅ labels months Jan, Feb, Mar...
    textAlign: "start",
    padding: 5,
        },
      ],
    ]
  );

  return () => cal.destroy();
}, [movies, username]);

  return (
    <div style={{ textAlign: "center" }}>
      <div id={`heatmap-${username}`} className="heatmap"></div>
      <div id={`heatmap-legend-${username}`} className="heatmap-legend"></div>
    </div>
  );
};

export default HeatMap;
