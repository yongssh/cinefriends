import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data, duration }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous draw

    const width = 520;
    const barHeight = 45;
    const height = data.length * barHeight + 50;

    svg.attr("width", width).attr("height", height);

    const sortedData = [...data].sort((a, b) => b.count - a.count); // Highest -> lowest

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(sortedData, (d) => d.count)])
      .range([0, width - 220])

    const yScale = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.username))
      .range([0, height])
      .padding(0.25);

    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "candyBarGradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#40BCF4"); // Light blue → green

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#00A85D"); // Green

    // ✅ Bars
    svg
      .selectAll(".bar")
      .data(sortedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 140)
      .attr("y", (d) => yScale(d.username))
      .attr("height", yScale.bandwidth())
      .attr("rx", 6) // rounded corners
      .attr("width", 0)
      .style("fill", "url(#candyBarGradient)")
      .transition()
      .duration(duration)
      .attr("width", (d) => xScale(d.count));

    // ✅ Username labels
    svg
      .selectAll(".label")
      .data(sortedData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", 0)
      .attr("y", (d) => yScale(d.username) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text((d) => d.username)
      .style("font-size", "16px")
      .style("fill", "#FFFFFF")
      .style("font-weight", "600");

    // ✅ Count values
    svg
      .selectAll(".value")
      .data(sortedData)
      .enter()
      .append("text")
      .attr("class", "value")
      .attr("x", (d) => xScale(d.count) + 150)
      .attr("y", (d) => yScale(d.username) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text((d) => d.count)
      .style("font-size", "14px")
      .style("fill", "#40BCF4")
      .style("font-weight", "600");

  }, [data, duration]);

  return <svg ref={chartRef}></svg>;
};

export default BarChart;
