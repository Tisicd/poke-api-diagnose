import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

export const register = async (username, password) => {
  const res = await axios.post(`${API_ENDPOINTS.AUTH}/register`, {
    username,
    password,
  });
  return res.data;
};

export const login = async (username, password) => {
  const res = await axios.post(`${API_ENDPOINTS.AUTH}/login`, {
    username,
    password,
  });
  return res.data;
};

