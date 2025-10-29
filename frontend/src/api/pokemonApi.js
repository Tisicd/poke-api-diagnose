import axios from "axios";
const BASE_URL = "http://localhost:4000/api/pokemons"; // reemplazar con ngrok en deploy

export const fetchPokemons = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

