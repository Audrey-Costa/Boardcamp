import joi from "joi";
import connection from "../db/pg.js";

async function getCategoriesId(){
    const {rows: categoriesIdObjects} = await connection.query(`SELECT id FROM categories`);
    const categoriesId = [];
    categoriesIdObjects.map((element)=>{
        categoriesId.push(element.id)
    })
    return categoriesId.join();
}

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string(),
    stockTotal: joi.number().greater(0).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().greater(0).required()
})

export default gameSchema;