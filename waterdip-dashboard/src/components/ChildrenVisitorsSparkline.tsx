import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChildrenVisitorData {
  date: string; 
  children: number;
}

interface SparklineChartProps {
  data: ChildrenVisitorData[];
  totalChildren: number;  // Add totalChildren to the props interface
}

const ChildrenVisitorsSparkline = ({ data, totalChildren }: SparklineChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
    },
    markers: {
      size: 0
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      opacity: 0.8,
    },
    yaxis: {
      min: 0,
      title: {
        text: 'Visitors'
      },
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true,
      },
      labels: {
        show: true,
      }
    },
    colors: ['#0991e3'],
    xaxis: {
      categories: data.map(item => item.date),
      labels: {
        show: false, 
      },
    },
    title: {
      text: `${totalChildren}`,  // Show total children count
      offsetX: 0,
      style: {
        fontSize: '24px',
      },
    },
    subtitle: {
      text: 'Total Children Visitors',
      offsetX: 0,
      style: {
        fontSize: '14px',
      },
    },
  };

  const series = [
    {
      name: 'Children',
      data: data.map(item => item.children),
    },
  ];

  return <Chart options={options} series={series} type="line" />;
};

export default ChildrenVisitorsSparkline;
