import axios from "axios";

export const getPokemonList = async (limit = 10) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const detailed = await Promise.all(
    data.results.map(async (p) => {
      const details = await axios.get(p.url);
      return {
        name: details.data.name,
        image: details.data.sprites.front_default
      };
    })
  );
  return detailed;
};

