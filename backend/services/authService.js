import { pool } from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_seguro_cambiar_en_produccion";

export const registerUser = async (username, password) => {
  try {
    // Validar que el usuario no exista
    const existingUser = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
    
    if (existingUser.rows.length > 0) {
      throw new Error("El usuario ya existe");
    }

    // Validar longitud mínima de contraseña
    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    // Validar longitud mínima de username
    if (username.length < 3) {
      throw new Error("El usuario debe tener al menos 3 caracteres");
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at",
      [username, hashedPassword]
    );

    const newUser = result.rows[0];

    // Generar token JWT
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { 
      token, 
      user: { id: newUser.id, username: newUser.username } 
    };
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async (username, password) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    
    if (result.rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { token, user: { id: user.id, username: user.username } };
  } catch (error) {
    throw error;
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
};

