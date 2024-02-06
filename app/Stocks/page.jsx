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
    <>
      <div className=" ">
        <div>
          <h1 className="text-4xl text-blue-500 font-semibold pb-2">
            Add Stock
          </h1>
          <form>
            <input
              type="text"
              value={stockForm?.companyName || ""}
              name="companyName"
              placeholder="Stock Name"
              className="border-blue-500 border-2 mr-5 px-4 py-2 rounded"
              onChange={handleChange}
            />
            <input
              type="text"
              value={stockForm?.symbol || ""}
              name="symbol"
              placeholder="Stock Symbol"
              className="border-blue-500 border-2 m-5 px-4 py-2 rounded"
              onChange={handleChange}
            />
            <input
              type="number"
              value={stockForm?.quantity || ""}
              name="quantity"
              placeholder="Quantity"
              className="border-blue-500 border-2 mr-5 px-4 py-2 rounded"
              onChange={handleChange}
            />
            <input
              type="number"
              value={stockForm?.purchasePrice || ""}
              name="purchasePrice"
              placeholder="Purchase Price"
              className="border-blue-500 border-2 m-5 px-4 py-2 rounded"
              onChange={handleChange}
            />
            <button
              onClick={addStock}
              className="bg-blue-500 opacity-90 text-white rounded  px-4 py-2 font-semibold"
            >
              Add
            </button>
          </form>
        </div>
        <div>
          <h1 className="text-4xl text-blue-500 font-semibold pb-8">
            Your stocks
          </h1>
          <Table deleteHandler={deleteHandler} data={stocks} names={heading} />
        </div>
      </div>
    </>
  );
};

export default Stocks;
