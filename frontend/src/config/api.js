// Configuración centralizada de la API
// Para desarrollo local, usa localhost:4000
// Para producción con ngrok, actualiza esta variable de entorno o este archivo

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const API_BASE_URL = BACKEND_URL;

// URLs de endpoints
export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  SEARCH: `${API_BASE_URL}/api/search`,
  POKEMONS: `${API_BASE_URL}/api/pokemons`,
  HISTORY: `${API_BASE_URL}/api/history`,
};
