"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Table from "@components/StockTable";

const heading = {
  first: "Company Name",
  second: "Stock Symbol",
  third: "Quantity",
  fourth: "Purchase Price",
  fifth: "Market Price",
};

const Stocks = () => {
  const { data: session } = useSession();

  const [stockForm, setstockForm] = useState({});
  const [stocks, setStocks] = useState([]);
  const [totalprice, settotalprice] = useState([]);
  const [stockQuantity, setstockQuantity] = useState([]);

  const addStock = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/stock/new", {
        method: "POST",
        body: JSON.stringify({
          symbol: stockForm.symbol,
          companyName: stockForm.companyName,
          quantity: stockForm.quantity,
          purchasePrice: stockForm.purchasePrice,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        setStocks([
          ...stocks,
          {
            symbol: stockForm.symbol,
            companyName: stockForm.companyName,
            quantity: stockForm.quantity,
            purchasePrice: stockForm.purchasePrice,
            userId: session?.user.id,
          },
        ]);
        setstockForm({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await fetch(`/api/stock/${session?.user.id}/stocks`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.json();
      setStocks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (item) => {
    try {
      await fetch(`/api/stock/${item._id.toString()}/stocks`, {
        method: "DELETE",
      });
      const filteredPosts = stocks.filter((p) => p._id !== item._id);
      setStocks(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setstockForm({ ...stockForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (session?.user.id) fetchStocks();
  }, [session]);

  return (
    <div className="mt-40 md:mt-32 lg:mt-28 w-full h-screen">
      <div className=" md:items-center md:justify-center">
        <div className=" md:mr-8">
          <div className="pb-8">
            <h1 className="text-4xl text-blue-500 text-center md:mb-10 font-semibold pb-2">
              Add Stock
            </h1>
            <form className="md:flex md:flex-wrap md:items-center md:mx-40">
              <div className="md:w-1/2 mb-4  pr-0 md:pr-5 ">
                <input
                  type="text"
                  value={stockForm?.companyName || ""}
                  name="companyName"
                  placeholder="Stock Name"
                  className="border-blue-500 border-2 w-full px-4 py-2 rounded"
                  onChange={handleChange}
                />
              </div>
              <div className="md:w-1/2 mb-4  pl-0 md:pl-5">
                <input
                  type="text"
                  value={stockForm?.symbol || ""}
                  name="symbol"
                  placeholder="Stock Symbol"
                  className="border-blue-500 border-2 w-full px-4 py-2 rounded"
                  onChange={handleChange}
                />
              </div>
              <div className="md:w-1/2 mb-4 md:mb-0 pr-0 md:pr-5">
                <input
                  type="number"
                  value={stockForm?.quantity || ""}
                  name="quantity"
                  placeholder="Quantity"
                  className="border-blue-500 border-2 w-full px-4 py-2 rounded"
                  onChange={handleChange}
                />
              </div>
              <div className="md:w-1/2 mb-4 md:mb-0 pl-0 md:pl-5">
                <input
                  type="number"
                  value={stockForm?.purchasePrice || ""}
                  name="purchasePrice"
                  placeholder="Purchase Price"
                  className="border-blue-500 border-2 w-full px-4 py-2 rounded"
                  onChange={handleChange}
                />
              </div>
              <button
                onClick={addStock}
                className="bg-blue-500 opacity-90 text-white rounded-md w-full md:mt-4 md:w-full px-4 py-2 font-semibold"
              >
                Add
              </button>
            </form>
          </div>
        </div>
        <div className="md:mt-0 mt-8 ">
          <div>
            <h1 className="text-4xl text-blue-500 text-center font-semibold pb-8">
              Your stocks
            </h1>
            <Table
              deleteHandler={deleteHandler}
              data={stocks}
              names={heading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
