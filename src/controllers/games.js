import connection from "../db/pg.js";

export async function listGames(req, res){
    const filter = req.query.name?.toUpperCase();

    try {
        const {rows: games} = await connection.query(`SELECT * FROM games WHERE UPPER(name) LIKE '${`$1`, [filter]}%'`);
        res.send(games);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function insertGames(req, res){
    const {
        name: game,
        image,
        stockTotal,
        categoryId,
        pricePerDay
    } = req.body

    try {
        const {rows: games} = await connection.query(`SELECT * FROM games`);
        const exist = games.filter((element)=>{
            return element.name === game;
        }
        )
        if(exist.length>0){
            return res.sendStatus(409);
        }
        const {rows: categories} = await connection.query(`SELECT id FROM categories`);
        const dontExist = categories.filter((element)=>{
            return element.id === categoryId;
        })
        if(dontExist.length === 0){
            return res.sendStatus(400);
        }

        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`, [game, image, stockTotal, categoryId, pricePerDay])
    
        res.status(201).send('Sem dados');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}