import { getPokemonList, getPaginatedPokemonList } from "../services/pokemonService.js";

export const fetchPokemons = async (req, res) => {
  try {
    const pokemons = await getPokemonList(10);
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener pokemons" });
  }
};

export const listPaginated = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const result = await getPaginatedPokemonList(limit, page);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener pokemons paginados" });
  }
};

