import React from "react";
import Chart from "react-apexcharts";

const DonutChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for the pie chart.</p>;
  }
  console.log(data);
  const chartData = {
    series: data.map((item) => Number(item.price)),
    labels: data.map((item) => item.name),
  };

  const chartOptions = {
    labels: chartData.labels,
    legend: {
      show: true,
    },
  };

  return (
    <Chart
      options={chartOptions}
      series={chartData.series}
      type="donut"
      width="600"
    />
  );
};

export default DonutChart;
