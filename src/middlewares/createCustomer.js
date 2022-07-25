import customerSchema from "../schemas/createCustomerSchema.js";


export default function createCustomer(req, res, next){
    const validation = customerSchema.validate(req.body, {abortEarly: false})
    if (validation.error){
        return res.sendStatus(400);
    }
    next();
}