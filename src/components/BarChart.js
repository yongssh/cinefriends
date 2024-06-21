import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();
  const [animatedData, setAnimatedData] = useState([]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous elements

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.username))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)]).nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .style("font-family", "Roboto Slab");
      ;

    const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(0)) 
    .call(g => g.select(".domain").remove()) 
    .style("font-family", "Roboto Slab");

    // Enter transition for bars
    svg.append("g")
      .selectAll("rect")
      .data(animatedData)
      .join("rect")
      .attr("x", d => x(d.username))
      .attr("y", d => y(0)) // Start bars from y = 0
      .attr("height", 0) // Start bars with height = 0
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue")
      .transition()
      .duration(1000) // Animation duration in milliseconds
      .attr("y", d => y(d.count)) // Final y position based on data
      .attr("height", d => y(0) - y(d.count)); // Final height based on data

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
  }, [data, animatedData]);

  useEffect(() => {
    // When the data prop changes, update animatedData state to trigger animation
    setAnimatedData(data);
  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default BarChart;
