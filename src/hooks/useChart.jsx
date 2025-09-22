// src/hooks/useChart.js
import { useEffect, useRef } from 'react';

const useChart = (createChart, dependencies) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current || !isMounted.current) return;

    // Clean up previous chart if it exists
    if (chartInstance.current) {
      try {
        chartInstance.current.destroy();
      } catch (e) {
        console.error('Error destroying chart:', e);
      }
      chartInstance.current = null;
    }

    // Only create new chart if component is still mounted
    if (isMounted.current) {
      chartInstance.current = createChart(chartRef.current);
    }

    return () => {
      // Defer the destruction to the next tick to allow the DOM to update
      setTimeout(() => {
        if (chartInstance.current && isMounted.current === false) {
          try {
            chartInstance.current.destroy();
          } catch (e) {
            console.error('Error destroying chart in cleanup:', e);
          }
          chartInstance.current = null;
        }
      }, 0);
    };
  }, dependencies);

  return chartRef;
};

export default useChart;