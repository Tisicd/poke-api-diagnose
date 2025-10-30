import axios from "axios";
import { pool } from "../db/db.js";

export const searchPokemon = async (query, userId) => {
  try {
    const pokemonName = query.toLowerCase().trim();
    
    // Buscar pokémon en PokeAPI
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      { timeout: 10000 }
    );

    const pokemonData = response.data;
    
    // Obtener descripción desde la especie
    let description = "Sin descripción disponible";
    try {
      const speciesResponse = await axios.get(pokemonData.species.url);
      const flavorTexts = speciesResponse.data.flavor_text_entries;
      const spanishText = flavorTexts.find(
        (entry) => entry.language.name === "es"
      ) || flavorTexts.find((entry) => entry.language.name === "en");
      
      if (spanishText) {
        description = spanishText.flavor_text.replace(/\f/g, " ").trim();
      }
    } catch (error) {
      console.error("Error al obtener descripción:", error.message);
    }

    const pokemon = {
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      description: description,
    };

    // Guardar en historial si hay userId
    if (userId) {
      await pool.query(
        "INSERT INTO search_history (user_id, search_query, pokemon_name) VALUES ($1, $2, $3)",
        [userId, query, pokemonData.name]
      );
    }

    return pokemon;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`Pokémon "${query}" no encontrado`);
    }
    throw new Error(`Error al buscar pokémon: ${error.message}`);
  }
};

// Mantener función antigua por compatibilidad
export const getPokemonList = async (limit = 10) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const detailed = await Promise.all(
    data.results.map(async (p) => {
      const details = await axios.get(p.url);
      return {
        name: details.data.name,
        image: details.data.sprites.front_default,
        description: "Descripción no disponible"
      };
    })
  );
  return detailed;
};

// Nueva: lista paginada con descripción en ES (fallback EN)
export const getPaginatedPokemonList = async (limit = 10, page = 1) => {
  const safeLimit = Math.max(1, Math.min(50, Number(limit) || 10));
  const safePage = Math.max(1, Number(page) || 1);
  const offset = (safePage - 1) * safeLimit;

  // Obtener listado base con count total
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${safeLimit}&offset=${offset}`
  );

  const items = await Promise.all(
    data.results.map(async (p) => {
      const details = await axios.get(p.url);

      // descripción por species
      let description = "Sin descripción disponible";
      try {
        const speciesResponse = await axios.get(details.data.species.url);
        const flavorTexts = speciesResponse.data.flavor_text_entries;
        const spanishText =
          flavorTexts.find((entry) => entry.language.name === "es") ||
          flavorTexts.find((entry) => entry.language.name === "en");
        if (spanishText) {
          description = spanishText.flavor_text.replace(/\f/g, " ").trim();
        }
      } catch (_) {}

      return {
        name: details.data.name,
        image: details.data.sprites.front_default,
        description,
      };
    })
  );

  const totalItems = data.count;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

  return { items, page: safePage, totalPages, totalItems };
};

