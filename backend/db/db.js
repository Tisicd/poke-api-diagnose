import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "pokemons",
});

export const initDB = async () => {
  try {
    // Crear tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de historial de búsquedas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS search_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        search_query VARCHAR(255) NOT NULL,
        pokemon_name VARCHAR(255) NOT NULL,
        searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insertar un usuario de prueba si no existe
    const userCheck = await pool.query("SELECT id FROM users WHERE username = $1", ["admin"]);
    if (userCheck.rows.length === 0) {
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.default.hash("admin123", 10);
      await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        "admin",
        hashedPassword,
      ]);
      console.log("✅ Usuario de prueba creado: admin / admin123");
    }

    console.log("✅ Base de datos PostgreSQL inicializada correctamente");
    return pool;
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
    throw error;
  }
};

export { pool };

