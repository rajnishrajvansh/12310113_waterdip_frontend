import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface TimeSeriesChartProps {
  data: { date: string; adults: number; children: number; babies: number }[];
}

const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350, // You might want to check the container height too
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
      categories: data.map(item => new Date(item.date).toISOString()) // Ensure the dates are ISO strings
    }
  };

  const series = [
    {
      name: 'Visitors',
      data: data.map(item => (Number(item.adults) + Number(item.children) + Number(item.babies))) // Ensure values are numeric
    }
  ];

  return <Chart options={options} series={series} type="line" />;
};

export default TimeSeriesChart;
