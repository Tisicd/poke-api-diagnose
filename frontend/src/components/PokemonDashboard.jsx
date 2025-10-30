import { useEffect, useMemo, useRef, useState } from "react";
import PokemonCard from "./PokemonCard";
import { searchPokemon } from "../services/searchService";
import { fetchPaginatedPokemons } from "../api/pokemonApi";
import { getHistory } from "../api/historyApi";
import { getToken } from "../services/authService";

export default function PokemonDashboard({ user, onLogout }) {
  // Resultado puntual del buscador
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Lista paginada
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingList, setLoadingList] = useState(false);
  const [errorList, setErrorList] = useState("");

  // Historial
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorHistory, setErrorHistory] = useState("");

  // Refs por nombre para hacer scroll
  const itemRefs = useRef({});
  const registerRef = (name) => (el) => {
    if (el) itemRefs.current[name] = el;
  };

  const token = useMemo(() => getToken(), []);

  // Cargar lista paginada
  useEffect(() => {
    const load = async () => {
      setLoadingList(true);
      setErrorList("");
      try {
        const res = await fetchPaginatedPokemons(page, 10);
        setItems(res.items);
        setTotalPages(res.totalPages);
      } catch (err) {
        setErrorList("Error al cargar la lista");
      } finally {
        setLoadingList(false);
      }
    };
    load();
  }, [page]);

  // Cargar historial
  const fetchHistory = async () => {
    if (!token) return;
    setLoadingHistory(true);
    setErrorHistory("");
    try {
      const res = await getHistory(token);
      setHistory(res);
    } catch (err) {
      setErrorHistory("Error al cargar historial");
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const data = await searchPokemon(searchQuery.trim());
      setPokemon(data);
      // refrescar historial tras búsqueda exitosa
      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.error || "Error al buscar pokémon");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ margin: 0 }}>⚡ Pokémon Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ color: "#666" }}>Usuario: {user?.username}</span>
          <button
            onClick={onLogout}
            style={{
              padding: "8px 16px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <form onSubmit={handleSearch} style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", gap: "10px", maxWidth: "500px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar pokémon (ej: pikachu)"
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 24px",
              background: loading ? "#ccc" : "#667eea",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>

      {error && (
        <div
          style={{
            padding: "15px",
            background: "#ffebee",
            color: "#d32f2f",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {loading && <p style={{ textAlign: "center", color: "#666" }}>Cargando...</p>}

      {pokemon && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <PokemonCard {...pokemon} />
        </div>
      )}

      {/* Lista paginada */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 280px)", gap: 20 }}>
        {items.map((it) => (
          <div key={it.name} ref={registerRef(it.name)}>
            <PokemonCard {...it} />
            {/* Si coincide con resultado buscado, botón para ver en página */}
            {pokemon && pokemon.name === it.name && (
              <button
                onClick={() => itemRefs.current[it.name]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                style={{ marginTop: 8, width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd", background: "#eef2ff" }}
              >
                Ver en página
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Estados lista */}
      {loadingList && <p style={{ marginTop: 20, textAlign: "center", color: "#666" }}>Cargando lista...</p>}
      {errorList && (
        <div style={{ marginTop: 20, textAlign: "center", color: "#d32f2f" }}>{errorList}</div>
      )}

      {/* Paginación */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
        <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: "8px 12px" }}>
          Anterior
        </button>
        {(() => {
          const buttons = [];
          const max = totalPages;
          const compact = max > 7;
          const pushBtn = (p) => buttons.push(
            <button key={p} disabled={p === page} onClick={() => setPage(p)} style={{ padding: "8px 12px" }}>{p}</button>
          );
          if (!compact) {
            for (let i = 1; i <= max; i++) pushBtn(i);
          } else {
            const first = [1, 2];
            const last = [max - 1, max];
            const around = [page - 1, page, page + 1].filter((x) => x > 2 && x < max - 1);
            const set = [...new Set([...first, ...around, ...last])].sort((a, b) => a - b);
            let prev = 0;
            set.forEach((p) => {
              if (p - prev > 1) buttons.push(<span key={`gap-${p}`}>...</span>);
              pushBtn(p);
              prev = p;
            });
          }
          return buttons;
        })()}
        <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} style={{ padding: "8px 12px" }}>
          Siguiente
        </button>
      </div>

      {/* Historial */}
      <div style={{ marginTop: 30 }}>
        <h3 style={{ marginBottom: 10 }}>Historial de búsquedas</h3>
        {loadingHistory && <p style={{ color: "#666" }}>Cargando historial...</p>}
        {errorHistory && <p style={{ color: "#d32f2f" }}>{errorHistory}</p>}
        {!loadingHistory && !errorHistory && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {history.map((h) => (
              <button
                key={h.id}
                onClick={() => setSearchQuery(h.pokemon_name) || document.querySelector('form').dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}))}
                style={{
                  padding: "6px 10px",
                  borderRadius: 16,
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                {h.pokemon_name}
              </button>
            ))}
            {history.length === 0 && <span style={{ color: "#888" }}>Sin búsquedas aún</span>}
          </div>
        )}
      </div>
    </div>
  );
}

