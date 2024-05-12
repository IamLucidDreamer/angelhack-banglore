import server from "../api/server";

export const signUp = async (username, password) => {
  try {
    const response = await server.post(`/signup`, { username, password });
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

export const login = async (username, password) => {
  try {
    const response = await server.post(`/token`, { username, password });
    const loginData = response.data;
    localStorage.setItem("token", loginData.access_token);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};
