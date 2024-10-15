import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

interface AdultVisitorsSparklineProps {
  data: { date: string; adults: number }[];
}

const AdultVisitorsSparkline: React.FC<AdultVisitorsSparklineProps> = ({ data }) => {
  useEffect(() => {
    // Calculate the total adults based on the filtered data
    const totalAdults = data.reduce((acc, item) => acc + item.adults, 0);

    // Map the adults data for the chart
    const adultsData = data.map((item) => item.adults);

    const options = {
      series: [{
        data: adultsData,
      }],
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
      },
      fill: {
        opacity: 0.8,
      },
      yaxis: {
        min: 0,
      },
      colors: ['#0991e3'],
      title: {
        text: `${totalAdults}`, // Dynamically set totalAdults in the title
        offsetX: 0,
        style: {
          fontSize: '24px',
        },
        labels: {
          show: true,
        }
      },
      subtitle: {
        text: 'Total Adults',
        offsetX: 0,
        style: {
          fontSize: '14px',
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#adults-sparkline-chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data]); // Recalculate and update the chart whenever `data` changes

  return <div id="adults-sparkline-chart"></div>;
};

export default AdultVisitorsSparkline;
