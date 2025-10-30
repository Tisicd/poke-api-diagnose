import express from "express";
import { search } from "../controllers/searchController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, search);

export default router;

