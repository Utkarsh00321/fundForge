"use client";
import React, { Suspense, useEffect, useState } from "react";
import DonutChartWrapper from "@components/DonutChartWrapper";
import { useSession } from "next-auth/react";

const RealEstate = () => {
  const { data: session } = useSession();
  const [realEstateForm, setrealEstateForm] = useState({});
  const [realEstate, setrealEstate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleterealEstateForm, setdeleterealEstateForm] = useState({});

  // Fetch realestate
  const fetchRealEstate = async () => {
    try {
      const response = await fetch(
        `api/realEstate/${session?.user.id.toString()}/realestates`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      let data = await response.json();
      setrealEstate(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Adding real estate
  const addrealEstate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/realEstate/new", {
        method: "POST",
        body: JSON.stringify({
          propertyType: realEstateForm.propertyType,
          address: realEstateForm.address,
          squareFootage: realEstateForm.squareFootage,
          purchasePrice: realEstateForm.purchasePrice,
          propertyId: realEstateForm.propertyId,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        setrealEstate([
          ...realEstate,
          {
            propertyType: realEstateForm.propertyType,
            address: realEstateForm.address,
            squareFootage: realEstateForm.squareFootage,
            purchasePrice: realEstateForm.purchasePrice,
            propertyId: realEstateForm.propertyId,
            user: session?.user.id,
          },
        ]);
        setrealEstateForm({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Deleting real estate
  const deleterealEstate = async (e) => {
    e.preventDefault();
    let deletePropertyId = await deleterealEstateForm.propertyId;

    try {
      await fetch(`/api/realEstate/${deletePropertyId}/realestates`, {
        method: "DELETE",
      });
      const filteredData = realEstate.filter(
        (obj) => obj.propertyId !== deletePropertyId
      );
      setrealEstate(filteredData);
      setdeleterealEstateForm({});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user.id) fetchRealEstate();
  }, [session]);

  const handleChange = (e) => {
    setrealEstateForm({ ...realEstateForm, [e.target.name]: e.target.value });
  };

  const deletehandleChange = (e) => {
    setdeleterealEstateForm({
      ...deleterealEstateForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-40 md:mt-32 lg:mt-28 w-full h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {session ? (
          <Suspense fallback={<div>loading...</div>}>
            {loading ? (
              <div className="text-green-500 text-2xl font-satoshi">
                Loading...
              </div>
            ) : (
              <>
                <div className="md:order-2">
                  <h1 className="text-4xl mb-24 md:mt-4 md:mb-8 font-semibold text-blue-500">
                    Your Real Estate Distribution:
                  </h1>
                  <DonutChartWrapper
                    data={realEstate.map((item) => ({
                      price: item.purchasePrice,
                      name: item.propertyId,
                    }))}
                  />
                </div>
                <div className="mt-24 md:mt-0 md:order-1">
                  <h1 className="text-4xl mt-4 font-semibold text-blue-500">
                    Add
                  </h1>
                  <form className="my-4">
                    <input
                      type="text"
                      value={realEstateForm.propertyType || ""}
                      name="propertyType"
                      placeholder="Property Type"
                      className="border-blue-500 w-[360px] border-2  my-2 px-2 py-2 rounded"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      value={realEstateForm.address || ""}
                      name="address"
                      placeholder="Address"
                      className="border-blue-500 border-2 w-[360px] my-2  px-2 py-2 rounded"
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      value={realEstateForm.purchasePrice || ""}
                      name="purchasePrice"
                      placeholder="Purchase Price"
                      className="border-blue-500 border-2 w-[360px] my-2 px-2 py-2 rounded"
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      value={realEstateForm.squareFootage || ""}
                      name="squareFootage"
                      placeholder="Area"
                      className="border-blue-500 border-2 my-2 w-[360px] px-2 py-2 rounded"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      value={realEstateForm.propertyId || ""}
                      name="propertyId"
                      placeholder="Property ID"
                      className="border-blue-500 border-2 w-[360px] my-2 px-2 py-2 rounded"
                      onChange={handleChange}
                    />
                    <button
                      onClick={addrealEstate}
                      className="w-[360px]  bg-blue-500 opacity-90 text-white rounded my-2  py-2 font-semibold"
                    >
                      Add
                    </button>
                  </form>
                  <h1 className="text-4xl mt-8 mb-4 font-semibold text-blue-500">
                    Delete
                  </h1>
                  <form className="">
                    <input
                      type="text"
                      value={deleterealEstateForm.propertyId || ""}
                      name="propertyId"
                      placeholder="Property ID"
                      className="w-[360px] border-blue-500 border-2  py-2 rounded"
                      onChange={deletehandleChange}
                    />
                    <button
                      onClick={deleterealEstate}
                      className="w-[360px] bg-blue-500 opacity-90 mb-8 md:mb-0 text-white rounded mt-4 py-2 font-semibold"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </>
            )}
          </Suspense>
        ) : (
          <div>
            <h1 className="font-satoshsi text-2xl text-blue-400">
              Sign-in to see your portfolio...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealEstate;
