"use client";
import React from "react";
import { useState, Suspense } from "react";
import { useEffect } from "react";
import PieChartWrapper from "@components/PieChartWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    gold: [],
    stock: [],
    fd: [],
    re: [],
  });

  const fetchfdData = async () => {
    try {
      const response = await fetch(`/api/fdAPI/${session?.user.id}/fds`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      let totalPrice = data.reduce(
        (acc, item) => acc + item.principalAmount,
        0
      );

      setChartData((prevData) => ({
        ...prevData,
        fd: totalPrice,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchgoldData = async () => {
    try {
      const response = await fetch(`/api/gold/${session?.user.id}/golds`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      let totalPrice = data.reduce((acc, item) => acc + item.purchasePrice, 0);

      setChartData((prevData) => ({
        ...prevData,
        gold: totalPrice,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const fetchRealEstateData = async () => {
    try {
      const response = await fetch(
        `/api/realEstate/${session?.user.id}/realestates`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      let totalPrice = data.reduce((acc, item) => acc + item.purchasePrice, 0);
      setChartData((prevData) => ({
        ...prevData,
        re: totalPrice,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await fetch(`/api/stock/${session?.user.id}/stocks`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      let totalPrice = data.reduce((acc, item) => acc + item.purchasePrice, 0);
      setChartData((prevData) => ({
        ...prevData,
        stock: totalPrice,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchfdData();
      fetchRealEstateData();
      fetchStockData();
      fetchgoldData();
    }
  }, [session]);

  const chartOptions = {
    chart: {
      type: "pie",
      width: 500, // Set your desired width
      height: 500, // Set your desired height
    },
    labels: ["Gold", "Stocks", "Fixed Deposit", "Real Estate"],
    colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="mt-40 md:mt-32 lg:mt-28 w-full h-screen">
      {session ? (
        <Suspense fallback={<div>loading...</div>}>
          {loading ? (
            <div className="text-green-500 text-center text-2xl font-satoshi">
              Loading...
            </div>
          ) : (
            <>
              <h1 className="text-2xl md:text-4xl text-center font-semibold px-4 md:px-24 text-blue-400">
                Your Portfolio Looks Amazing:
              </h1>
              <div className="px-4 md:px-0">
                <PieChartWrapper
                  options={chartOptions}
                  series={[
                    chartData.gold,
                    chartData.stock,
                    chartData.fd,
                    chartData.re,
                  ]}
                />
              </div>
            </>
          )}
        </Suspense>
      ) : (
        <div className="px-4">
          <h1 className="font-satoshsi text-xl md:text-2xl text-blue-400">
            Sign-in to see your portfolio...
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
