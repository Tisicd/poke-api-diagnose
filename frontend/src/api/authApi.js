import axios from "axios";

const BASE_URL = "http://localhost:4000/api/auth";

export const login = async (username, password) => {
  const res = await axios.post(`${BASE_URL}/login`, {
    username,
    password,
  });
  return res.data;
};

