"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

const Gold = () => {
  const { data: session } = useSession();
  const [gold, setGold] = useState(0);
  const [price, setPrice] = useState(0);
  const [goldForm, setgoldForm] = useState({});
  const [deletegoldForm, setdeletegoldForm] = useState({});
  const [livePrice, setLivePrice] = useState(0);

  const fetchGold = async () => {
    try {
      const response = await fetch(`/api/gold/${session?.user.id}/golds`, {
        method: "GET",
      });
      const data = await response.json();

      let totalWeight = 0;
      let totalPurchasePrice = 0;

      // Use the map function to iterate over the array
      data.map((item) => {
        // Accumulate the values
        totalWeight += item.weight;
        totalPurchasePrice += item.purchasePrice;
      });

      setGold(totalWeight);

      setPrice(totalPurchasePrice);
    } catch (error) {
      console.log(error);
    }
  };

  const addGold = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/gold/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          huid: goldForm.huid,
          weight: goldForm.weight,
          type: goldForm.type,
          purchasePrice: goldForm.purchasePrice,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        const newPrice = price + goldForm.purchasePrice;
        const newWeight = gold + goldForm.weight;
        setGold(newWeight);
        setPrice(newPrice);
        setgoldForm({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGold = async (e) => {
    e.preventDefault();
    let deleteData = deletegoldForm.huid;
    try {
      // After adding delete form just modify | accordingly
      await fetch(`/api/gold/${deleteData}/golds`, {
        method: "DELETE",
      });
      fetchGold();
      setdeletegoldForm({});
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGoldPrices = async () => {
    const currency = "INR";
    const unit = "g";

    const apiUrl = `${"https://api.metals.dev/v1/latest"}?api_key=${"ZFQ2QWWMOJSXPBNHXGJR509NHXGJR"}&currency=${currency}&unit=${unit}`;

    try {
      const response = await axios.get(apiUrl);
      const goldPrice = response.data.metals.gold;

      console.log(
        `Current Gold Price in ${currency} per ${unit}: ${goldPrice}`
      );
      return goldPrice;
    } catch (error) {
      console.error("Error fetching gold prices:", error.message);
      throw error; // Handle the error as needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user.id) {
        await fetchGold();
        const liveGoldPrice = await fetchGoldPrices();
        setLivePrice(liveGoldPrice);
      }
    };

    fetchData();
  }, [session]);

  const handleChange = (e) => {
    setgoldForm({ ...goldForm, [e.target.name]: e.target.value });
  };

  const deletehandleChange = (e) => {
    setdeletegoldForm({
      ...deletegoldForm,
      [e.target.name]: e.target.value,
    });
  };

  const calculatePercentageChange = (livePrice, totalQuantity, totalPrice) => {
    if (totalPrice == 0) {
      return 0;
    }
    const percentageChange = (
      ((livePrice * totalQuantity - totalPrice) * 100) /
      totalPrice
    ).toFixed(2);
    return percentageChange;
  };

  return (
    <div className="mt-28">
      <div className="grid grid-cols-2">
        <div className="card shadow ">
          <h1 className="font-bold text-center text-yellow-500 text-4xl mx-10 pr-2 py-5">
            Gold
          </h1>

          <p>
            <span
              className={`font-semibold mx-32 tracking-tight text-4xl ${
                calculatePercentageChange(+gold * +livePrice, gold, price) < 0
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {calculatePercentageChange(gold * livePrice, gold, price)} %
            </span>
          </p>

          <div className="container w-fit px-10 mx-20 my-5">
            <p className="text-lg text-slate-700 font-semibold py-3">
              Gold Owned:{" "}
              <span className="text-xl text-blue-500 font-semibold">
                {gold} gm
              </span>
            </p>

            <p className="text-lg text-slate-700 font-semibold py-3">
              Market Price:{" "}
              <span className="text-xl text-blue-500 font-semibold">
                {+gold * +livePrice}
              </span>
            </p>

            <p className="text-xl text-slate-700 font-semibold py-3">
              Purchase Price:{" "}
              <span className="text-xl text-blue-500 font-semibold">
                {price}
              </span>
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-semibold text-blue-500 ml-24">
            Add Gold
          </h1>
          <form className="my-6">
            <input
              type="text"
              value={goldForm.huid || ""}
              name="huid"
              placeholder="HUID Number"
              className="border-blue-500 border-2 ml-24 mr-2 my-2 px-2 py-1 rounded"
              onChange={handleChange}
            />
            <input
              type="number"
              value={goldForm.weight || ""}
              name="weight"
              placeholder="Weight in gm"
              className="border-blue-500 border-2 m-1 my-2  px-2 py-1 rounded"
              onChange={handleChange}
            />
            <input
              type="number"
              value={goldForm.purchasePrice || ""}
              name="purchasePrice"
              placeholder="Purchase Price"
              className="border-blue-500 border-2 ml-24 mr-2 my-2 px-2 py-1 rounded"
              onChange={handleChange}
            />

            <input
              type="number"
              value={goldForm.type || ""}
              name="type"
              placeholder="Purity"
              className="border-blue-500 border-2 m-1 my-2 px-2 py-1 rounded"
              onChange={handleChange}
            />

            <button
              onClick={addGold}
              className="w-[410px] ml-24 bg-blue-500 opacity-90 text-white rounded my-2 px-4 py-2 font-semibold"
            >
              Add
            </button>
          </form>
          <h1 className="text-4xl mb-6 font-semibold text-blue-500 ml-24">
            Delete Gold
          </h1>
          <form className="">
            <input
              type="text"
              value={deletegoldForm.huid || ""}
              name="huid"
              placeholder="HUID Number"
              className="ml-24 w-[410px] border-blue-500 border-2  py-1 rounded"
              onChange={deletehandleChange}
            />
            <br />
            <button
              onClick={deleteGold}
              className="w-[410px] ml-24 bg-blue-500 opacity-90 text-white rounded mt-4 py-2 font-semibold"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gold;
