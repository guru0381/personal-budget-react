import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

export default function ChartJS() {
  const chartRef = useRef(null); // to store the chart instance

  useEffect(() => {
    let dataSource = {
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#ffcd56',
        '#ff6384',
        '#36a2eb',
        '#F08080',
        '#DFFF00',
        '#9FE2BF',
        '#CCCCFF'
          ],
        },
      ],
      labels: [],
    };

    axios.get('http://localhost:3100/budget')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          dataSource.datasets[0].data[i] = res.data[i].budget;
          dataSource.labels[i] = res.data[i].title;
        }

        if (chartRef.current) {
          chartRef.current.destroy(); // destroy previous chart instance if it exists
        }

        const ctx = document.getElementById("myChart");
        chartRef.current = new Chart(ctx, {
          type: "pie",
          data: dataSource,
        });
      });
  }, []); // Empty dependency array means this useEffect runs once, similar to componentDidMount

  return (
    <div className="App">
      <canvas id="myChart" />
    </div>
  );
}
