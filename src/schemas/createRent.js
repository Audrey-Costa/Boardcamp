import joi from "joi";

const rentSchema = joi.object({
    customerId: joi.string().required(),
    gameId: joi.string().required(),
    daysRented: joi.number().greater(0).required()
})

export default rentSchema;