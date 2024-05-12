import server from "../api/server";

export const getMutualFunds = async (queryFilters) => {
  try {
    const response = await server.get(
      `/mutual-funds?${queryFilters ? queryFilters : ""}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMutualFundsFilter = async () => {
  try {
    const response = await server.get("/mutual-funds/filters");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const buyMutualFunds = async (mutualFundId, units) => {
  try {
    const response = await server.post(
      `/mutual-funds/${mutualFundId}?units=${units}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
