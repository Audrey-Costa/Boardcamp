import { Router } from "express";
import { listCategories, insertCategories } from "../controllers/categories.js"; 
import createCategory from "../middlewares/createCategory.js";

const categories = Router();

categories.get("/categories", listCategories);
categories.post("/categories", createCategory, insertCategories);

export default categories;