import { Router } from "express";
import categories from "./categories.js";

const router = Router();
router.use(categories);

export default router;