"use client";
import React, { useState } from "react";

let renderTableRow = ({ data, deleteHandler, calculation }) => {
  return (
    <>
      {data.map((item) => (
        <tr
          key={item._id}
          className="w-full text-black bg-white border-2 border-blue-600"
        >
          <th
            scope="row"
            className="px-6 py-1 font-medium text-black bg-white whitespace-nowrap"
          >
            {item.bankName}
          </th>
          <td className="px-6 py-1">{item.principalAmount}</td>
          <td className="px-6 py-1">{item.interestRate}</td>
          <td className="px-6 py-1">{item.tenure}</td>
          <td className="px-6 py-1">
            {calculation(item.principalAmount, item.interestRate, item.tenure)}
          </td>
          <td>
            <button
              onClick={() => {
                deleteHandler(item);
              }}
              className="  bg-blue-500 opacity-90 text-white rounded m-2 px-4 py-2 font-semibold"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

const Table = ({ data, deleteHandler, names, calculation }) => {
  if (data.length == 0) {
    return (
      <h1 className="text-4xl font-semibold font-satoshi text-red-500">
        No fixed deposits were found!
      </h1>
    );
  }
  return (
    <table className="w-full text-sm text-left text-white rtl:text-right bg-blue-400  border-2  border-blue-600">
      <thead className="text-xs text-white uppercase bg-blue-400 ">
        <tr>
          <th scope="col" className="px-6 py-3 ">
            {names.first}
          </th>
          <th scope="col" className="px-6 py-3">
            {names.second}
          </th>
          <th scope="col" className="px-6 py-3 ">
            {names.third}
          </th>
          <th scope="col" className="px-6 py-3">
            {names.fourth}
          </th>
          <th scope="col" className="px-6 py-3">
            {names.fifth}
          </th>
          <th scope="col" className="px-6 py-3 "></th>
        </tr>
      </thead>
      <tbody className="bg-slate-200">
        {renderTableRow({ data, deleteHandler, calculation })}
      </tbody>
      <tfoot>
        <tr className=" text-white uppercase bg-blue-400 ">
          <th scope="row" className="px-6 py-3 ">
            Total
          </th>
          <td className="px-6 py-3">3</td>
          <td className="px-6 py-3">21,000</td>
          <th scope="col" className="px-6 py-3 "></th>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;