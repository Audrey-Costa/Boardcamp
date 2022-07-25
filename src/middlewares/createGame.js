import gameSchema from "../schemas/createGameSchema.js";


export default function createGame(req, res, next){
    const validation = gameSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        return res.sendStatus(400);
    }
    next();
}