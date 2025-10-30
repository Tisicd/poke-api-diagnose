import { searchPokemon } from "../services/pokemonService.js";

export const search = async (req, res) => {
  try {
    const { q } = req.query;
    const userId = req.user?.userId;

    if (!q) {
      return res.status(400).json({ error: "Parámetro 'q' es requerido" });
    }

    const pokemon = await searchPokemon(q, userId);
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

