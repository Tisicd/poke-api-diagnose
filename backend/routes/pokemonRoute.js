import express from "express";
import { fetchPokemons } from "../controllers/pokemonController.js";
const router = express.Router();

router.get("/", fetchPokemons);
export default router;

