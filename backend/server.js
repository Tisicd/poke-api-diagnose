import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pokemonRoute from "./routes/pokemonRoute.js";
import { initDB } from "./db/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/pokemons", pokemonRoute);

const PORT = process.env.PORT || 4000;

initDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Backend corriendo en http://localhost:${PORT}`));
});

