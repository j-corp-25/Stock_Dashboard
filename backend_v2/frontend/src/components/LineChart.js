import axios from 'axios';
import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'TIME_SERIES_INTRADAY',
            symbol: 'IBM',
            interval: '5min',
            apikey: 'demo' // Replace with your actual API key
          }
        });
        // Process the data to the format suitable for Chart.js
        const processedData = processData(response.data);
        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (data) => {
    const timeSeries = data['Time Series (5min)'];
    const chartLabels = [];
    const chartData = [];

    for (let [key, value] of Object.entries(timeSeries)) {
      chartLabels.push(key);
      chartData.push(value['4. close']);
    }

    return {
      labels: chartLabels.reverse(),
      datasets: [
        {
          label: 'Stock Price',
          data: chartData.reverse(),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  };

  return (
    <div>
      {chartData && chartData.datasets ? (
        <Line data={chartData} options={{ /* options for the chart */ }} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LineChart;
