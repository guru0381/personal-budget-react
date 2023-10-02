import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from "axios";


function D3JSChart(props) {

  const [dataSource, setDataSource]=useState([]);

  const {
    data = dataSource,
    outerRadius = 200,
    innerRadius = 100,
    } = props;

  const margin = {
    top: 50, right: 50, bottom: 50, left: 50,
  };
  
  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  

    var colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.title)) 
    .range(['#ffcd56',
    '#ff6384',
    '#36a2eb',
    '#F08080',
    '#DFFF00',
    '#9FE2BF',
    '#CCCCFF']); 


  useEffect(() => {
    drawChart();
    }, [data]);


  function drawChart() {

    axios.get('http://localhost:3100/budget')
      .then(res => {
        //console.log(res);
        setDataSource(res.data);
      });

    
    // Remove the old svg
    d3.select('#pie-container')
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const outerArc = d3.arc()
      .innerRadius(outerRadius * 0.9)
      .outerRadius(outerRadius * 0.9);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.budget);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

      arc.append('polyline')
      .attr("points", function(d) {
          var posA = arcGenerator.centroid(d);  
          var posB = outerArc.centroid(d);     
          var posC = outerArc.centroid(d);     
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; 
          posC[0] = outerRadius * 0.95 * (midangle < Math.PI ? 1 : -1); 
          return [posA, posB, posC];
      })
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', 1);

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 2);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.title)
      .style('fill', (_, i) => colorScale(data.length - i))
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }    

  return (
    <div className="App" id="pie-container"/>
  );
}

export default D3JSChart;