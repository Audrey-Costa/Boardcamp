import categorySchema from "../schemas/createCategoryValidation.js";

export default function createCategory(req, res, next){
    const validation = categorySchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        return res.sendStatus(400);
    }
    next();
}