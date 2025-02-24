import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  incomeData: number[];
  expenseData: number[];
  labels: string[];
}

const Chart: React.FC<ChartProps> = ({ incomeData, expenseData, labels }) => {
  const chartRef = useRef<ChartJS<'bar'> | null>(null);

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light green
        borderColor: 'rgba(75, 192, 192, 1)', // Dark green
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Light red
        borderColor: 'rgba(255, 99, 132, 1)', // Dark red
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Income vs. Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Destroy the chart instance on unmount
  useEffect(() => {
    const chart = chartRef.current;

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default Chart;