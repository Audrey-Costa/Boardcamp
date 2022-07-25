import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js"

dotenv.config();

const server = express();
server.use(express.json(), cors(), router);

const PORT = process.env.PORT;

server.listen(PORT, ()=> {console.log(`Server on in the port ${PORT}`)})