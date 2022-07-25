import rentSchema from "../schemas/createRent.js";

export default function createRent(req, res, next){
    const validation = rentSchema.validate(req.body, {abortEarly: false});
    if (validation.error){
        return res.sendStatus(400);
    }
    next();
}