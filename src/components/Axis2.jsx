import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./Axis2.css";

const Axis2 = ({ data }) => {
  const chartRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const tooltip = d3.select(tooltipRef.current);

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };

    const width = svg.attr("width") - margin.left - margin.right;
    const height = svg.attr("height") - margin.top - margin.bottom;

    // const xMin = new Date(d3.min(dates));
    // const xMax = new Date(d3.max(dates));

    const dates = data.map((d) => new Date(d[0]));

    const x = d3
      .scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[1])])
      .nice()
      .range([height, 0]);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    chart
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    chart.append("g").attr("id", "y-axis").call(d3.axisLeft(y));

    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(new Date(d[0])))
      .attr("y", (d) => y(d[1]))
      .attr("width", width / 275)
      .attr("height", (d) => height - y(d[1]))
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .on("mouseover", (event, d) => {
        const [date, gdp] = d;
        tooltip
          .style("opacity", 1)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`)
          .html(`Date: ${date}<br>GDP: ${gdp}`)
          .attr("data-date", date);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    return () => {
      svg.select("*").remove();
    };
  }, [data]);

  return (
    <div id="chart">
      <h1 id="title">United State GDP</h1>
      <svg ref={chartRef} width={900} height={500}></svg>
      <div id="tooltip" ref={tooltipRef}></div>
    </div>
  );
};

export default Axis2;
