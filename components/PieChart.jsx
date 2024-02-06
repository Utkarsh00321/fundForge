import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ options, series }) => {
  return <Chart options={options} series={series} type="pie" width="600" />;
};

export default PieChart;
