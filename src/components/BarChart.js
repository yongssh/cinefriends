import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, duration }) => {
  const svgRef = useRef();
  const [animatedData, setAnimatedData] = useState([]);
  
  // Define width and height
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const width = Math.min(600, window.innerWidth * 0.9);
  const height = Math.min(300, window.innerHeight * 0.4);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    // Clear previous elements
    svg.selectAll("*").remove(); 

    // Set dynamic width and height based on screen size
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = Math.min(600, window.innerWidth * 0.9);
    const height = Math.min(300, window.innerHeight * 0.4);

    // Adjust inner width/height based on margins
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // X scale for usernames
    const x = d3.scaleBand()
      .domain(data.map(d => d.username))
      .range([margin.left, innerWidth + margin.left]) 
      .padding(0.2);

    // Y scale for counts
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)]).nice()
      .range([innerHeight, margin.top]);

    // X-axis setup
    const xAxis = g => g
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .style("font-family", "Roboto Slab")
      .style("color", "#00A85D");

    // Y-axis setup
    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5)) 
      .style("font-family", "Roboto Slab")
      .style("color", "#00A85D");

    // Enter transition for bars
    svg.append("g")
      .selectAll("rect")
      .data(animatedData)
      .join("rect")
      .attr("x", d => x(d.username))
      .attr("y", d => y(0))
      .attr("height", 0)
      .attr("width", x.bandwidth())
      .attr("fill", "#FFF")
      .transition()

      .duration(duration)
      .attr("y", d => y(d.count))
      .attr("height", d => y(0) - y(d.count));


    // Add text labels on bars
    svg.append("g")
      .selectAll("text")
      .data(animatedData)
      .join("text")
      .attr("x", d => x(d.username) + x.bandwidth() / 2)
      // labels start from y = 0!!
      .attr("y", d => y(0)) 

      .attr("text-anchor", "middle")
      .attr("font-family", "Roboto Slab")
      .attr("fill", "#ff8000")
      .transition()
      .duration(duration)

      .attr("y", d => y(d.count) - 5)
      .text(d => d.count);

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
  }, [data, animatedData, duration]);

  useEffect(() => {
    setAnimatedData(data);
  }, [data]);

  return (
    <div className="bar-chart-container">
      <svg 
        ref={svgRef} 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        preserveAspectRatio="xMidYMid meet">
      </svg>
    </div>
  );
};

export default BarChart;
