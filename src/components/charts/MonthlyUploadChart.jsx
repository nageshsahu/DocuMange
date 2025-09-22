// src/components/charts/MonthlyUploadChart.js
import React from 'react';
import Chart from 'chart.js/auto';
import useDarkMode from '../../hooks/useDarkMode';
import useChart from '../../hooks/useChart';

function MonthlyUploadChart({ documents }) {
  const darkMode = useDarkMode();

  const createChart = (canvas) => {
    // Calculate documents per month
    const monthlyData = Array(12).fill(0);
    documents.forEach(doc => {
      const month = new Date(doc.date).getMonth();
      monthlyData[month]++;
    });

    const textColor = darkMode ? '#e2e8f0' : '#374151';
    const gridColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Documents Uploaded',
          data: monthlyData,
          backgroundColor: darkMode ? 'rgba(129, 140, 248, 0.6)' : 'rgba(99, 102, 241, 0.5)',
          borderColor: darkMode ? '#818cf8' : 'rgba(99, 102, 241, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: textColor
            },
            grid: {
              color: gridColor
            }
          },
          x: {
            ticks: {
              color: textColor
            },
            grid: {
              color: gridColor
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        }
      }
    });
  };

  const chartRef = useChart(createChart, [documents, darkMode]);

  return <canvas ref={chartRef}></canvas>;
}

export default MonthlyUploadChart;