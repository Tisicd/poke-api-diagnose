import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pokemonRoute from "./routes/pokemonRoute.js";
import authRoute from "./routes/authRoute.js";
import searchRoute from "./routes/searchRoute.js";
import historyRoute from "./routes/historyRoute.js";
import { initDB } from "./db/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/pokemons", pokemonRoute);
app.use("/api/auth", authRoute);
app.use("/api/search", searchRoute);
app.use("/api/history", historyRoute);

const PORT = process.env.PORT || 4000;

// Esperar a que PostgreSQL esté listo antes de iniciar el servidor
const waitForDB = async () => {
  const maxRetries = 10;
  const retryDelay = 2000;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      await initDB();
      break;
    } catch (error) {
      if (i === maxRetries - 1) {
        console.error("❌ No se pudo conectar a la base de datos después de varios intentos");
        process.exit(1);
      }
      console.log(`⏳ Esperando a PostgreSQL... (intento ${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

waitForDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Backend corriendo en http://localhost:${PORT}`));
});

