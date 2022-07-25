import connection from "../db/pg.js";
import dayjs from "dayjs";

export async function listRentals(req, res){
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;
    try {
        const {rows: rentals} = await connection.query(`SELECT * FROM rentals`)
        for (let rent of rentals){
            const {rows: costumer} = await connection.query(`SELECT id, name FROM customers WHERE id = $1`, [rent.customerId]);
            const {rows: game} = await connection.query(`SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1`, [rent.gameId]);
            rent.rentDate = dayjs(rent.rentDate).format("YYYY-MM-DD");
            rent.customer = {
               id: costumer[0].id,
               name: costumer[0].name
            };
            rent.game = {
                id: game[0].id,
                name: game[0].name,
                categoryId: game[0].categoryId,
                categoryName: game[0].categoryName
            }
        }
        
        res.send(rentals)
        } catch (error) {
        console.log(error);
        res.sendStatus(500);        
    }
}

export async function insertRent(req, res){
    const {
        customerId,
        gameId,
        daysRented
    } = req.body;

    try {
        const {rows: customer} = await connection.query(`SELECT * FROM customers WHERE customers.id = $1`, [customerId]);
        const {rows: game} = await connection.query(`SELECT * FROM games WHERE games.id = $1`, [gameId]);
        if(customer.length === 0 || game.length === 0){
            return res.sendStatus(400);
        }

        const {rows: rents} = await connection.query(`SELECT * FROM rentals WHERE rentals."gameId" = $1`, [gameId]);
        if(rents.length >= game[0].stockTotal){
            return res.sendStatus(400);
        }
        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, dayjs(Date.now()).format("YYYY-MM-DD"), daysRented, null, daysRented*game[0].pricePerDay, null]);

        res.status(201).send('Sem dados');
    } catch (error) {      
        console.log(error);
        res.sendStatus(500);        
    }
}

export async function endRent(req, res){
    const rentId = req.params.id
    try {
        const {rows: rentals} = await connection.query(`SELECT * FROM rentals WHERE rentals.id = $1`, [rentId]);
        if(rentals.length === 0){
            return res.sendStatus(400);
        }
        if(rentals[0].returnDate !== null){
            return res.sendStatus(400);
        }
        const {rows: pricePerDay} = await connection.query(`SELECT "pricePerDay" FROM games WHERE id = $1`, [rentals[0].gameId]);

        await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE rentals.id = $3`, [dayjs(Date.now()).format("YYYY-MM-DD"), dayjs(dayjs(Date.now())).diff(dayjs(
            dayjs(rentals[0].rentDate)
            .add(rentals[0].daysRented, 'day'))
            , 'day'
            ) * -pricePerDay[0].pricePerDay, rentId]);
        console.log(pricePerDay)
        res.status(201).send('Sem dados')
    } catch (error) { 
        console.log(error);
        res.sendStatus(500);         
    }
}

export async function deleteRent(req, res){
    const rentId = req.params.id
    try {
        const {rows: rentals} = await connection.query(`SELECT * FROM rentals WHERE rentals.id = $1`, [rentId]);
        if(rentals.length === 0){
            return res.sendStatus(400);
        }
        if(rentals[0].returnDate === null){
            return res.sendStatus(400);
        }
        await connection.query(`DELETE FROM rentals WHERE rentals.id = $1`, [rentId])
        res.status(201).send("Sem dados")
    } catch (error) {
        console.log(error);
        res.sendStatus(500);   
    }
}