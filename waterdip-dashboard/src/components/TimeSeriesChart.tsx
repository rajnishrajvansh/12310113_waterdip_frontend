
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
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    yaxis: {
      title: {
        text: 'Visitors'
      },
    },
    
    xaxis: {
      type: 'datetime',
      categories: data.map(item => item.date),
    }
  };

 
  const series = [
    {
      name: 'Visitors',
      data: data.map(item => (item.adults + item.children + item.babies)),
    }
  ];

  return <Chart options={options} series={series} type="area" />;
};

export default TimeSeriesChart;
