
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface CountryVisitorsChartProps {
  data: { country: string; visitors: number }[];
}

const CountryVisitorsChart = ({ data }: CountryVisitorsChartProps) => {
  const options: ApexOptions = {
    chart: { type: 'bar', height: 350, },
    plotOptions: {
      bar: {
        borderRadius: 5,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
       categories: data.map(item => item.country), 
       position:'top',
       axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
      },
      yaxis: {
        title: {
          text: 'Visitors'
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        }
      
      },
      title: {
        text: 'Country Visitors Chart',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
  };

  const series = [
    {
      name: 'Visitors',
      data: data.map(item => item.visitors),
    },
  ];

  return <Chart options={options} series={series} type="bar" />;
};

export default CountryVisitorsChart;
