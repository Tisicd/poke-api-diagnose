import { authenticateUser, registerUser } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username y password son requeridos" });
    }

    const result = await registerUser(username, password);
    res.status(201).json(result);
  } catch (error) {
    // Si el error es de usuario duplicado, retornar 409
    if (error.message.includes("ya existe")) {
      return res.status(409).json({ error: error.message });
    }
    // Otros errores de validación
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username y password son requeridos" });
    }

    const result = await authenticateUser(username, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

