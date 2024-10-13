
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChildrenVisitorData {
  date: string; 
  children: number;
}

interface SparklineChartProps {
  data: ChildrenVisitorData[];
  totalChildren: number; 
}

const ChildrenVisitorsSparkline = ({ data, totalChildren }: SparklineChartProps) => {
  const options: ApexOptions = {
    chart: {
      type: 'line',
      sparkline: { enabled: true },
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: ['#DCE6EC'],
    xaxis: {
      categories: data.map(item => item.date),
      labels: {
        show: false, 
      },
    },
    title: {
      text: `${totalChildren}`, 
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
