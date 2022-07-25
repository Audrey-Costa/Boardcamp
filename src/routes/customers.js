import { Router } from "express";
import { insertCustomers, listCustomer, listCustomers, updateCustomer } from "../controllers/customers.js";
import createCustomer from "../middlewares/createCustomer.js";

const customers = Router();

customers.get("/customers", listCustomers);
customers.get("/customers/:id", listCustomer)
customers.post("/customers", createCustomer, insertCustomers);
customers.put("/customers/:id", createCustomer, updateCustomer);

export default customers;