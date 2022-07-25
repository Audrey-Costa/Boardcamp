import { Router } from "express";
import { deleteRent, endRent, insertRent, listRentals } from "../controllers/rentals.js";

const rentals = Router();

rentals.get("/rentals", listRentals);
rentals.post("/rentals", insertRent);
rentals.post("/rentals/:id/return", endRent);
rentals.delete("/rentals/:id", deleteRent);

export default rentals;