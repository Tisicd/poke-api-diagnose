import express from "express";
import { fetchPokemons, listPaginated } from "../controllers/pokemonController.js";
const router = express.Router();

router.get("/", fetchPokemons);
router.get("/list", listPaginated);
export default router;

