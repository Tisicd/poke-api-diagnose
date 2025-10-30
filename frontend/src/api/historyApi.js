import axios from "axios";

const BASE_URL = "http://localhost:4000/api/history";

export const getHistory = async (token) => {
  const res = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // [{ id, search_query, pokemon_name, searched_at }]
};


