import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, duration }) => {
  const svgRef = useRef();
  const [animatedData, setAnimatedData] = useState([]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    // Clear previous elements
    svg.selectAll("*").remove(); 

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // initialize x-variable (will display usernames)
    const x = d3.scaleBand()
      .domain(data.map(d => d.username))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // initialize y-variable (will display actual)
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)]).nice()
      .range([height - margin.bottom, margin.top]);

    // initialize x axis 
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .style("font-family", "Roboto Slab")
      .style("color", "#40bcf4");

    // initialize y axis 
    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(0))
      .call(g => g.select(".domain").remove())
      .style("font-family", "Roboto Slab")
      .style("color", "#40bcf4");

    // enter transition for bars
    svg.append("g")
      .selectAll("rect")
      .data(animatedData)
      .join("rect")
      .attr("x", d => x(d.username))
       // Start bars from y = 0 (initialize y=0)
      .attr("y", d => y(0))
      // Start bars with height = 0
      .attr("height", 0) 
      .attr("width", x.bandwidth())
      .attr("fill", "#40bcf4")
      .transition()
     
      .duration(duration)
      // final y position based on number of movies viewed
      .attr("y", d => y(d.count)) 
      // final height based on data
      .attr("height", d => y(0) - y(d.count)); 

    // add text labels on the bars
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

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
  }, [data, animatedData, duration]);

  useEffect(() => {
    // when the data prop changes, rmbr update animatedData state to trigger animation start
    setAnimatedData(data);
  }, [data]);

  return <svg ref={svgRef} width="800" height="400"></svg>;
};

export default BarChart;
