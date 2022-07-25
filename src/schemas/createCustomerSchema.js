import joi from "joi";
import dayjs from "dayjs";

const hoje = dayjs(Date.now()).format("YYYY-MM-DD");

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().regex(/^([0-9]{10,11})$/).required(),
    cpf: joi.string().regex(/^([0-9]{11})$/).required(),
    birthday: joi.string().regex(/^([0-9]{4}(-[0-9]{2}){2})$/).required(),
    birthday: joi.date().less(hoje)
})

export default customerSchema;