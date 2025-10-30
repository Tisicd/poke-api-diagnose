import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import PokemonDashboard from "./components/PokemonDashboard";
import { isAuthenticated, login, logout, getUser } from "./services/authService";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
      setUser(getUser());
    }
  }, []);

  const handleLogin = async (username, password) => {
    const response = await login(username, password);
    setAuthenticated(true);
    setUser(response.user);
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUser(null);
  };

  if (!authenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <PokemonDashboard user={user} onLogout={handleLogout} />;
}

export default App;

