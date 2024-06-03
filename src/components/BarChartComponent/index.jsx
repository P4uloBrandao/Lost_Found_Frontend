import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js
import '../../assets/colors/colors.css'
const BarChart = ({ data }) => {
    const chartContainer = useRef(null); // Reference to the chart container
    const chartInstance = useRef(null); // Reference to the Chart.js instance
  
    useEffect(() => {
      // Check if the chart instance exists and data is available
      if (chartInstance.current !== null) {
        // If the chart instance exists, destroy it before creating a new one
        chartInstance.current.destroy();
      }
  
      // Check if the chart container exists and data is available
      if (chartContainer.current && data && data.length > 0) {
        const ctx = chartContainer.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(item => item.name || item._id), // Use name if available, otherwise use _id
            datasets: [{
              label: 'Users by Role', // Label for the dataset
              data: data.map(item => item.count), // Data values
              backgroundColor: '#3cb68379', // Background color for bars
              borderColor: '#3CB684', // Border color for bars
              borderRadius: 10, // Adjust to make the bars rounded
              borderWidth: 1 // Border width for bars
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true, // Start the y-axis at zero
                grid: {
                  display: false, // Hide the y-axis grid lines
                  drawBorder: false, // Hide the y-axis border
                },
                ticks: {
                  display: false, // Hide the y-axis labels
                }
              },
              x: {
                grid: {
                  display: false, // Hide the x-axis grid lines
                  drawBorder: false, // Hide the x-axis border
                },
                ticks: {
                  display: true, // Show the x-axis labels
                }
              }
            },
            plugins: {
              legend: {
                display: false // Hide the legend
              },
              tooltip: {
                enabled: true // Show tooltips
              }
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            backgroundColor: 'rgba(0, 0, 0, 0)', // Make the chart background transparent
          }
        });
      }
  
      // Cleanup function to destroy the chart instance when the component unmounts
      return () => {
        if (chartInstance.current !== null) {
          chartInstance.current.destroy();
        }
      };
    }, [data]);
  
    return (
      <div>
        <canvas ref={chartContainer}></canvas> {/* Render chart */}
      </div>
    );
  };
  
  export default BarChart;