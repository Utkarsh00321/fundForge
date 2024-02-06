"use client";
import React, { useState, useEffect } from "react";

const PieChartWrapper = ({ options, series }) => {
  const [PieChartComponent, setPieChartComponent] = useState(null);

  useEffect(() => {
    import("@components/PieChart")
      .then(({ default: PieChart }) => {
        setPieChartComponent(<PieChart options={options} series={series} />);
      })
      .catch((error) => {
        console.error("Error importing PieChart:", error);
      });
  }, []);

  return PieChartComponent;
};

export default PieChartWrapper;
