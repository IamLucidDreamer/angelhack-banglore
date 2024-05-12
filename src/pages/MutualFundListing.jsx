"use client";
import React, { useEffect, useState } from "react";
import { getMutualFunds, getMutualFundsFilter } from "../services/mutualFunds";
import { useQuery } from "react-query";

const FilterList = ({
  filtersData,
  queryFilter,
  setQueryFilterHandler,
  removeQueryFilterHandler,
}) => {
  return (
    <>
      {filtersData &&
        Object.keys(filtersData).map((key) => (
          <div key={key} className="mb-4">
            <div className="flex items-center justify-between">
              <h1 className="px-4 text-lg font-medium text-gray-800">
                {key.toUpperCase().split("_").join(" ")}
              </h1>
            </div>
            <div className="flex flex-col gap-2 p-4">
              {Array.isArray(filtersData[key]) &&
                +filtersData[key].length > 0 &&
                filtersData[key].map((filter, index) => (
                  <div key={index} className="flex items-center gap-2 pl-2">
                    <input
                      type="checkbox"
                      id={filter.key}
                      name={filter.key}
                      value={filter.key}
                      checked={queryFilter[key]?.includes(filter.key)}
                      onChange={() => {
                        queryFilter[key]?.includes(filter.key)
                          ? removeQueryFilterHandler(key, filter.key)
                          : setQueryFilterHandler(key, filter.key);
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={filter.key} className="text-gray-700">
                      {filter.key}
                    </label>
                  </div>
                ))}
              {typeof filtersData[key] === "object" &&
                !Array.isArray(filtersData[key]) && (
                  <FilterList
                    filtersData={filtersData[key]}
                    queryFilter={queryFilter}
                    setQueryFilterHandler={setQueryFilterHandler}
                    removeQueryFilterHandler={removeQueryFilterHandler}
                  />
                )}
            </div>
          </div>
        ))}
    </>
  );
};

const MutualFundListing = () => {
  const [queryFilter, setQueryFilter] = useState({});

  const setQueryFilterHandler = (key, name) => {
    setQueryFilter((prevQueryFilter) => ({
      ...prevQueryFilter,
      [key]: prevQueryFilter[key] ? [...prevQueryFilter[key], name] : [name],
    }));
  };

  const removeQueryFilterHandler = (key, name) => {
    setQueryFilter((prevQueryFilter) => ({
      ...prevQueryFilter,
      [key]: prevQueryFilter[key].filter((item) => item !== name),
    }));
  };

  const createQueryString = (queryFilter) => {
    let queryString = "";
    for (const key in queryFilter) {
      if (queryFilter[key].length > 0) {
        queryString += `${key}=${queryFilter[key].join(",")}&`;
      }
    }
    return queryString.slice(0, -1);
  };

  const { data, isLoading, isError, refetch } = useQuery(
    "GET_MUTUAL_FUNDS",
    () => getMutualFunds(createQueryString(queryFilter))
  );
  const { data: filtersData } = useQuery(
    "GET_MUTUAL_FUND_FILTERS",
    getMutualFundsFilter
  );

  useEffect(() => {
    refetch();
  }, [queryFilter]);

  return (
    <div className="bg-white mx-auto max-w-screen-2xl p-4">
      <div className="pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">
            All Mutual Funds
          </h1>
        </div>
      </div>
      <div className="flex mt-4 gap-4">
        <div className="w-3/4 flex flex-col gap-6">
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
              {data?.map((fundData, index) => (
                <a
                  // href={redirectUrls.mutualFundDetail(fundData?.plan_id)}
                  className="flex items-center justify-between gap-4 p-8 bg-white border rounded-xl shadow-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border bg-gray-100 p-4">
                      <Avatar name={fundData?.scheme_name} />
                    </div>
                    <div className="p-2">
                      <h1 className="text-2xl font-semibold text-gray-800">
                        {fundData.scheme_name}
                      </h1>
                      <div className="mt-2 flex items-center gap-3 text-gray-700">
                        <h1>{fundData?.FundsRating?.category.split(":")[0]}</h1>
                        {fundData?.FundsRating?.category.split(":")[1] && (
                          <div className="h-2 w-2 rounded-full bg-gray-300" />
                        )}
                        <h1>{fundData?.FundsRating?.category.split(":")[1]}</h1>
                        {fundData?.FundsRating?.risk_grade && (
                          <div className="h-2 w-2 rounded-full bg-gray-300" />
                        )}
                        <h1>{fundData?.FundsRating?.risk_grade}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-center">
                    {fundData?.FundReturnLatest?.ret_1year && (
                      <div>
                        <h1 className="text-lg text-green-600">1Y Return</h1>
                        <h1>
                          {Math.round(
                            fundData?.FundReturnLatest?.ret_1year * 100
                          ) / 100}
                          %
                        </h1>
                      </div>
                    )}
                    {fundData?.FundReturnLatest?.ret_3year && (
                      <div>
                        <h1 className="text-lg text-green-600">3Y CAGR</h1>
                        <h1>
                          {Math.round(
                            fundData?.FundReturnLatest?.ret_3year * 100
                          ) / 100}
                          %
                        </h1>
                      </div>
                    )}
                    {fundData?.FundReturnLatest?.ret_5year && (
                      <div>
                        <h1 className="text-lg text-green-600">5Y CAGR</h1>
                        <h1>
                          {Math.round(
                            fundData?.FundReturnLatest?.ret_5year * 100
                          ) / 100}
                          %
                        </h1>
                      </div>
                    )}
                  </div>
                  <button
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => {}}
                  >
                    Buy
                  </button>
                </a>
              ))}
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
  ];

  const charCode = initials.charCodeAt(0) + initials.charCodeAt(1);
  return colors[charCode % colors.length];
};

const getInitials = (name) => {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName ? lastName[0] : firstName[1]}`;
};

const Avatar = ({ name, size = "10" }) => {
  const initials = getInitials(name);
  const bgColor = getBgColor(initials);

  return (
    <div
      className={`flex items-center justify-center ${bgColor} text-white font-bold rounded-full`}
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      {initials.toUpperCase()}
    </div>
  );
};
