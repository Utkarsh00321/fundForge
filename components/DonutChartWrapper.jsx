"use client";
import React, { useState, useEffect } from "react";

const DonutChartWrapper = ({ data }) => {
  const [DonutChartComponent, setDonutChartComponent] = useState(null);

  useEffect(() => {
    import("@components/DonutChart")
      .then(({ default: DonutChart }) => {
        setDonutChartComponent(<DonutChart data={data} />);
      })
      .catch((error) => {
        console.error("Error importing PieChart:", error);
      });
  }, []);

  return DonutChartComponent;
};

export default DonutChartWrapper;
