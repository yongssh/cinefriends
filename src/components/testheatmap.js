import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const TestHeatmap = () => {
  const currentYear = new Date().getFullYear();
  const testData = [
    { date: `${currentYear - 1}-01-01`, count: 1 },
    { date: `${currentYear - 1}-01-02`, count: 3 },
    { date: `${currentYear - 1}-01-03`, count: 2 },
    { date: `${currentYear - 1}-01-04`, count: 4 },
  ];

  return (
    <div>
      <h2>Test Heatmap</h2>
      <CalendarHeatmap
        startDate={new Date(currentYear - 1, 0, 1)}
        endDate={new Date(currentYear - 1, 11, 31)}
        values={testData}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': value.date ? `${value.date}: ${value.count} movies` : 'No movies watched',
          };
        }}
      />
    </div>
  );
};

export default TestHeatmap;
