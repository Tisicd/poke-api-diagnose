import { searchPokemon as searchPokemonApi } from "../api/searchApi.js";
import { getToken } from "./authService.js";

export const searchPokemon = async (query) => {
  const token = getToken();
  if (!token) {
    throw new Error("No autenticado");
  }
  return await searchPokemonApi(query, token);
};

