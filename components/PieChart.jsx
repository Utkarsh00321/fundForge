import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ options, series }) => {
  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width="100%"
      style={{ maxWidth: "600px", margin: "auto" }}
    />
  );
};

export default PieChart;
