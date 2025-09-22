// src/components/charts/CategoryChart.js
import React from 'react';
import Chart from 'chart.js/auto';
import useDarkMode from '../../hooks/useDarkMode';
import useChart from '../../hooks/useChart';

function CategoryChart({ documents }) {
  const darkMode = useDarkMode();

  const createChart = (canvas) => {
    // Calculate category breakdown
    const personalCount = documents.filter(doc => doc.category === 'personal').length;
    const professionalCount = documents.filter(doc => doc.category === 'professional').length;

    const textColor = darkMode ? '#e2e8f0' : '#374151';

    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Personal', 'Professional'],
        datasets: [{
          data: [personalCount, professionalCount],
          backgroundColor: [
            darkMode ? 'rgba(74, 222, 128, 0.6)' : 'rgba(16, 185, 129, 0.5)',
            darkMode ? 'rgba(96, 165, 250, 0.6)' : 'rgba(59, 130, 246, 0.5)'
          ],
          borderColor: [
            darkMode ? '#4ade80' : 'rgba(16, 185, 129, 1)',
            darkMode ? '#60a5fa' : 'rgba(59, 130, 246, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
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

export default CategoryChart;