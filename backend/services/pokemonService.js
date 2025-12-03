import axios from "axios";
import { pool } from "../db/db.js";

// Función auxiliar para extraer todos los datos de un Pokémon
const extractPokemonData = (pokemonData, speciesData = null) => {
  // Extraer tipos
  const types = pokemonData.types.map((t) => ({
    name: t.type.name,
    slot: t.slot,
  }));

  // Extraer estadísticas base
  const stats = {};
  pokemonData.stats.forEach((stat) => {
    const statName = stat.stat.name;
    stats[statName] = stat.base_stat;
  });

  // Extraer habilidades
  const abilities = pokemonData.abilities.map((a) => ({
    name: a.ability.name,
    is_hidden: a.is_hidden,
    slot: a.slot,
  }));

  // Obtener experiencia base
  const baseExperience = pokemonData.base_experience || 0;

  // Obtener peso y altura (convertidos a kg y m)
  const weight = (pokemonData.weight / 10).toFixed(1); // de hectogramos a kg
  const height = (pokemonData.height / 10).toFixed(1); // de decímetros a m

  // Obtener descripción desde species
  let description = "Sin descripción disponible";
  if (speciesData) {
    const flavorTexts = speciesData.flavor_text_entries;
    const spanishText =
      flavorTexts.find((entry) => entry.language.name === "es") ||
      flavorTexts.find((entry) => entry.language.name === "en");
    if (spanishText) {
      description = spanishText.flavor_text.replace(/\f/g, " ").trim();
    }
  }

  return {
    name: pokemonData.name,
    image: pokemonData.sprites.front_default,
    description,
    types,
    stats: {
      hp: stats.hp || 0,
      attack: stats.attack || 0,
      defense: stats.defense || 0,
      specialAttack: stats["special-attack"] || 0,
      specialDefense: stats["special-defense"] || 0,
      speed: stats.speed || 0,
    },
    abilities,
    baseExperience,
    weight,
    height,
  };
};

export const searchPokemon = async (query, userId) => {
  try {
    const pokemonName = query.toLowerCase().trim();
    
    // Buscar pokémon en PokeAPI
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      { timeout: 10000 }
    );

    const pokemonData = response.data;
    
    // Obtener datos de especie para descripción
    let speciesData = null;
    try {
      const speciesResponse = await axios.get(pokemonData.species.url);
      speciesData = speciesResponse.data;
    } catch (error) {
      console.error("Error al obtener datos de especie:", error.message);
    }

    // Extraer todos los datos del Pokémon
    const pokemon = extractPokemonData(pokemonData, speciesData);

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
      
      // Obtener datos de especie
      let speciesData = null;
      try {
        const speciesResponse = await axios.get(details.data.species.url);
        speciesData = speciesResponse.data;
      } catch (_) {}

      return extractPokemonData(details.data, speciesData);
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

      // Obtener datos de especie para descripción
      let speciesData = null;
      try {
        const speciesResponse = await axios.get(details.data.species.url);
        speciesData = speciesResponse.data;
      } catch (_) {}

      // Extraer todos los datos del Pokémon
      return extractPokemonData(details.data, speciesData);
    })
  );

  const totalItems = data.count;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

  return { items, page: safePage, totalPages, totalItems };
};

