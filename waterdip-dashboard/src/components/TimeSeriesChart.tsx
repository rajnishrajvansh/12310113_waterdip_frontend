import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Adjusted interface for VisitorsData
interface VisitorsData {
  date: string; // ISO date string like '2023-10-14'
  adults: number;
  children: number;
  babies: number;
}

interface TimeSeriesChartProps {
  data: VisitorsData[];
}

// Helper function to extract year, month, and day from ISO date
const getDateParts = (isoDate: string) => {
  const date = new Date(isoDate);
  return {
    year: date.getFullYear(),
    month: date.toLocaleString('default', { month: 'long' }), // Month in string format (e.g., 'October')
    day: date.getDate(),
  };
};

// Helper function to convert date to milliseconds
const getDateInMillis = (year: number, month: string, day: number) => {
  return new Date(year, new Date(Date.parse(month + " 1")).getMonth(), day).getTime();
};

const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {

  // Process data to accumulate visitors by date
  const visitorsByDate = data.reduce((acc, booking) => {
    const { year, month, day } = getDateParts(booking.date);
    const dateKey = getDateInMillis(year, month, day);

    const totalVisitors = 
      Number(booking.adults || 0) + 
      Number(booking.children || 0) + 
      Number(booking.babies || 0); 

    if (acc[dateKey]) {
      acc[dateKey] += totalVisitors;
    } else {
      acc[dateKey] = totalVisitors;
    }
    return acc;
  }, {} as Record<number, number>); // Explicitly define 'number' as the key type

  // Format the data for the chart
  const formattedData = Object.keys(visitorsByDate).map(dateKey => ({
    x: Number(dateKey),  // Convert 'dateKey' from string to number
    y: visitorsByDate[Number(dateKey)],  // Access using the numeric dateKey
  }));

  const options: ApexOptions = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0
    },
    title: {
      text: 'Time Series: Number of Visitors per Day',
      align: 'left'
    },
    yaxis: {
      title: {
        text: 'Visitors'
      }
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(0);  // Format visitor count
        }
      }
    },
    stroke: {
      curve: 'smooth'
    }
  };

  const series = [
    {
      name: 'Visitors',
      data: formattedData  // Array of {x: dateInMillis, y: visitorsCount}
    }
  ];

  return <Chart options={options} series={series} type="area" height={350} />;
};

export default TimeSeriesChart;
