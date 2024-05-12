"use client";
import React, { useEffect, useState } from "react";
import {
  buyMutualFunds,
  getMutualFunds,
  //   getMutualFundsFilter,
} from "../services/mutualFunds";
import { useQuery } from "react-query";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MutualFundListing = () => {
    const navigate = useNavigate();
  const { logout } = useAuth();
  const { data, isLoading, isError } = useQuery("GET_MUTUAL_FUNDS", () =>
    getMutualFunds()
  );

  return (
    <div className="bg-white mx-auto max-w-screen-2xl p-4">
      <div className="pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">
            All Mutual Funds
          </h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/portfolio")}>Portfolio</button>
            <button onClick={() => logout()}>Logout</button>
          </div>
        </div>
      </div>
      <div className="flex mt-4 gap-4">
        <div className="w-full flex flex-col gap-6">
          {isError ? (
            <div className="container mx-auto">
              <h1 className="text-red-600 text-center">Error fetching data</h1>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-b-transparent"></div>
            </div>
          ) : (
            <>
              {data?.map((fundData, index) => {
                return (
                  <MutualFundCard fundData={fundData} key={fundData?.id} />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MutualFundListing;

const getBgColor = (initials) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-gray-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-cyan-500",
    "bg-lime-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-fuchsia-500",
    "bg-rose-500",
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-gray-600",
    "bg-teal-600",
    "bg-orange-600",
    "bg-cyan-600",
    "bg-lime-600",
    "bg-amber-600",
    "bg-emerald-600",
    "bg-fuchsia-600",
    "bg-rose-600",
  ];

  const charCode1 = initials.charCodeAt(0);
  const charCode2 =
    initials.length > 1 ? initials.charCodeAt(1) : initials.charCodeAt(0);
  const combinedCharCode = charCode1 + charCode2;
  return colors[combinedCharCode % colors.length];
};

const getInitials = (name) => {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName ? lastName[0] : firstName[1] || ""}`;
};

const Avatar = ({ name, size = "10" }) => {
  const initials = getInitials(name);
  const bgColor = getBgColor(initials);

  return (
    <div
      className={`flex w-20 h-20 items-center justify-center ${bgColor} text-white text-2xl font-bold rounded-full`}
    >
      {initials.toUpperCase()}
    </div>
  );
};

const MutualFundCard = ({ fundData }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(0);

  const buyMutualFund = async (fundId, quantity) => {
    toast.promise( async () => await buyMutualFunds(fundId, quantity), {
      pending: "Buying Mutual Fund 🚀",
      success: "Mutual Fund bought successfully 👌",
      error: "There was some error 🤯",
    });
  };

  return (
    <a
      key={fundData?.id}
      // href={redirectUrls.mutualFundDetail(fundData?.plan_id)}
      className="flex items-center justify-between gap-4 p-8 bg-white border rounded-xl shadow-lg hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border bg-gray-100 p-4">
          <Avatar name={fundData?.scheme_name} />
        </div>
        <div className="p-2 w-2/3">
          <h1 className="text-2xl font-semibold text-gray-800">
            {fundData.scheme_name}
          </h1>
        </div>
      </div>
      <div className="flex gap-12 text-center items-start">
        {fundData?.ret_1year && (
          <div>
            <h1 className="text-lg text-green-600">1Y Return</h1>
            <h1>{Math.round(fundData?.ret_1year * 100) / 100}%</h1>
          </div>
        )}
        {fundData?.ret_3year && (
          <div>
            <h1 className="text-lg text-green-600">3Y CAGR</h1>
            <h1>{Math.round(fundData?.ret_3year * 100) / 100}%</h1>
          </div>
        )}
        {fundData?.ret_5year && (
          <div>
            <h1 className="text-lg text-green-600">5Y CAGR</h1>
            <h1>{Math.round(fundData?.ret_5year * 100) / 100}%</h1>
          </div>
        )}
        {fundData?.nav && (
          <div className="text-2xl mx-2">
            <h1 className="text-lg text-green-600">NAV</h1>
            <h1>₹{fundData?.nav}</h1>
          </div>
        )}
        {isAuthenticated && (
          <div>
            <label className="block mb-2 text-gray-700">Buying Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        onClick={() => {
          isAuthenticated
            ? buyMutualFund(fundData?.plan_id, quantity)
            : navigate("/login");
        }}
      >
        Buy
      </button>
    </a>
  );
};
