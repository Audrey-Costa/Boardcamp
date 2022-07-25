import { Router } from "express";
import categories from "./categories.js";
import customers from "./customers.js";
import games from "./games.js";

const router = Router();
router.use(categories, games, customers);

export default router;