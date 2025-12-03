import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PokemonDashboard from "./components/PokemonDashboard";
import { isAuthenticated, login, register, logout, getUser } from "./services/authService";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

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

  const handleRegister = async (username, password) => {
    const response = await register(username, password);
    setAuthenticated(true);
    setUser(response.user);
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUser(null);
    setShowRegister(false);
  };

  if (!authenticated) {
    if (showRegister) {
      return (
        <RegisterPage
          onRegister={handleRegister}
          onSwitchToLogin={() => setShowRegister(false)}
        />
      );
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  return <PokemonDashboard user={user} onLogout={handleLogout} />;
}

export default App;

