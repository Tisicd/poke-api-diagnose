import { pool } from "../db/db.js";

export const getUserHistory = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const result = await pool.query(
      `SELECT id, search_query, pokemon_name, searched_at
       FROM search_history
       WHERE user_id = $1
       ORDER BY searched_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener historial" });
  }
};


