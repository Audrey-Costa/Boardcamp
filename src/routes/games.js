import { Router } from "express";
import { listGames, insertGames } from "../controllers/games.js";
import createGame from "../middlewares/createGame.js";

const games = Router();

games.get("/games", listGames);
games.post("/games", createGame ,insertGames);

export default games;