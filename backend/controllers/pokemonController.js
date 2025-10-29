import { getPokemonList } from "../services/pokemonService.js";

export const fetchPokemons = async (req, res) => {
  try {
    const pokemons = await getPokemonList(10);
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener pokemons" });
  }
};

