import connection from "../db/pg.js";

export async function listCategories(req, res){
    try {
        const {rows: categories} = await connection.query(`SELECT * FROM categories`);
        res.send(categories);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function insertCategories(req, res){
    const {name: category} = req.body;
    try {
        const {rows: categories} = await connection.query(`SELECT * FROM categories`);
        const exist = categories.filter((element)=>{
            return element.name === category
            }
        )
        if(exist.length>0){
            return res.sendStatus(409);
        }
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [category])
        res.status(201).send('Sem dados');
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);        
    }
}