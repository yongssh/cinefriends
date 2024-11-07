import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BubbleChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous elements

    const width = 800;
    const height = 400;

    // Create a scale for the circle radii based on the counts
    const radiusScale = d3.scaleSqrt()
      .domain([0, d3.max(data, d => d.count)])
      .range([10, 50]);

    // Create a simulation for positioning the bubbles
    const simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => radiusScale(d.count) + 2));

    // Append groups for each circle
    const bubbles = svg.append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", d => radiusScale(d.count))
      .attr("fill", "#fafafa")
      .attr("stroke", "#40bcf4")
      .attr("stroke-width", 2);

    // Labels for each bubble
    const labels = svg.append("g")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#ff8000")
      .text(d => `${d.username}: ${d.count}`);

    // Update the positions of the circles and labels
    simulation.on("tick", () => {
      bubbles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });
  }, [data]);

  return <svg ref={svgRef} width="90vw" height="90vh"></svg>;
};

export default BubbleChart;
