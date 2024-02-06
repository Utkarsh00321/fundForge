"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Table from "@components/FixedDepositTable";
import { useRouter } from "next/navigation";

const FD = () => {
  // States
  const [fdForm, setfdForm] = useState({});
  const [fd, setfd] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetching all the fds from the database

  const fetchfd = async () => {
    try {
      const response = await fetch(`/api/fdAPI/${session?.user.id}/fds`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.json();
      setfd(data);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Adding fd to database

  const addfd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/fdAPI/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankName: fdForm.bankName,
          principalAmount: fdForm.principalAmount,
          interestRate: fdForm.interestRate,
          tenure: fdForm.tenure,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        setfd([
          ...fd,
          {
            bankName: fdForm.bankName,
            principalAmount: fdForm.principalAmount,
            interestRate: fdForm.interestRate,
            tenure: fdForm.tenure,
            userId: session?.user.id,
          },
        ]);
        setfdForm({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Deleting the fd from database

  const deleteHandler = async (fdItem) => {
    try {
      await fetch(`/api/fdAPI/${fdItem._id.toString()}/fds`, {
        method: "DELETE",
      });
      const filteredPosts = fd.filter((p) => p._id !== fdItem._id);
      setfd(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setfdForm({ ...fdForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (session?.user.id) fetchfd();
  }, [session]);

  const calFun = (principal, interestRate, time) => {
    // Convert interest rate to a decimal
    const r = interestRate / 100;

    // Calculate compound interest
    const compoundInterest = principal * Math.pow(1 + r, time);

    // Calculate total amount
    const totalAmount = compoundInterest;

    return totalAmount;
  };

  const heading = {
    first: "Bank Name",
    second: "Principal Amount",
    third: "Interest Rate",
    fourth: "Tenure",
    fifth: "Final Amount",
  };
  return (
    <>
      {session ? (
        <Suspense fallback={<div>loading...</div>}>
          {loading ? (
            <div className="text-green-500 text-2xl font-satoshi">
              Loading...
            </div>
          ) : (
            <>
              <div className="">
                <div className=" pb-10 px-10">
                  <h1 className="text-2xl font-semibold px-4 text-blue-500">
                    Create FD
                  </h1>
                  <form>
                    <input
                      type="text"
                      value={fdForm?.bankName || ""}
                      name="bankName"
                      placeholder="Bank Name"
                      className="border-blue-500 border-2 m-2 px-2 py-2 rounded"
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      value={fdForm?.principalAmount || ""}
                      name="principalAmount"
                      placeholder="Principal Amount"
                      className="border-blue-500 border-2 m-2 px-2 py-2 rounded"
                      onChange={handleChange}
                    />

                    <input
                      type="number"
                      value={fdForm?.interestRate || ""}
                      name="interestRate"
                      placeholder="Interest Rate"
                      className="border-blue-500 border-2 m-2 px-2 py-2 rounded"
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      value={fdForm?.tenure || ""}
                      name="tenure"
                      placeholder="Tenure"
                      className="border-blue-500 border-2 m-2 px-2 py-2 rounded"
                      onChange={handleChange}
                    />
                    <button
                      onClick={addfd}
                      className="bg-blue-500 opacity-90 text-white rounded m-5 px-4 py-2 font-semibold"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>

              <Table
                deleteHandler={deleteHandler}
                data={fd}
                names={heading}
                calculation={calFun}
              />
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
    </>
  );
};

export default FD;
