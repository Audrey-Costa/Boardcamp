import connection from "../db/pg.js";
import dayjs from "dayjs";

export async function listCustomers(req, res){
    const filter = req.query.cpf;
    try {
        const {rows: customers} = await connection.query(`SELECT * FROM customers WHERE cpf LIKE '${`$1`, [filter]}%'`);
        customers.map((element)=>{
            element.birthday = dayjs(element.birthday).format("YYYY-MM-DD")
        })
        res.send(customers);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function listCustomer(req, res){
    const id = req.params.id
    try {
        const {rows: customer} = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if(customer.length === 0){
            return res.sendStatus(404);
        }
        customer[0].birthday = dayjs(customer[0].birthday).format("YYYY-MM-DD")
        res.send(customer[0])
    } catch (error) {        
        console.log(error);
        res.sendStatus(500);
    }
}

export async function insertCustomers(req, res){
    const {
        name,
        phone,
        cpf,
        birthday
      } = req.body

    try {
        const {rows: customers} = await connection.query(`SELECT * FROM customers`);
        const exist = customers.filter((element)=>{
            return element.cpf === cpf;
        }
        )
        if(exist.length>0){
            return res.sendStatus(409);
        }
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)`, [name, phone, cpf, dayjs(birthday).format("YYYY-MM-DD")]);

        res.status(201).send('Sem dados');
    } catch (error) {        
        console.log(error);
        res.sendStatus(500);
    }
}

export async function updateCustomer(req, res){
    const id = req.params.id
    const {
        name,
        phone,
        cpf,
        birthday
      } = req.body

      try {
        const {rows: customers} = await connection.query(`SELECT * FROM customers`);
        const exist = customers.filter((element)=>{
            return element.cpf === cpf;
        }
        )
        if(exist.length>0){
            return res.sendStatus(409);
        }

        await connection.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, [name, phone, cpf, dayjs(birthday).format("YYYY-MM-DD"), id]);

        res.status(200).send('Sem dados')
      } catch (error) {       
        console.log(error);
        res.sendStatus(500);
      }
}