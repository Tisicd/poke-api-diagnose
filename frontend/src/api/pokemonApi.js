import axios from "axios";
const BASE_URL = "http://localhost:4000/api/pokemons"; // reemplazar con ngrok en deploy

export const fetchPokemons = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const fetchPaginatedPokemons = async (page = 1, limit = 10) => {
  const res = await axios.get(`${BASE_URL}/list`, {
    params: { page, limit }
  });
  return res.data; // { items, page, totalPages, totalItems }
};

