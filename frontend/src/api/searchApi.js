import axios from "axios";

const BASE_URL = "http://localhost:4000/api/search";

export const searchPokemon = async (query, token) => {
  const res = await axios.get(`${BASE_URL}?q=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

