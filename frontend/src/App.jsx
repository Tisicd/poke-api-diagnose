import { useState } from "react";
import { fetchPokemons } from "./api/pokemonApi";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    const data = await fetchPokemons();
    setPokemons(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>⚡ Poke List Viewer</h1>
      <button onClick={handleFetch}>Obtener Pokémon</button>
      {loading && <p>Cargando...</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 180px)", gap: 20, marginTop: 30 }}>
        {pokemons.map((p) => <PokemonCard key={p.name} {...p} />)}
      </div>
    </div>
  );
}

export default App;

