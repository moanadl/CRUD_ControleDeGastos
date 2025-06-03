import { BadRequestError } from "../errors/bad-request.error.js";

export function validateTransaction (request, response, next) {

    const date = request.body.date;
    if (!date) {
        return response.status(400).json(new BadRequestError('Data não informada'));
    }

    if (isNaN(new Date(date))) { // A data vem em formato de milisegundos, então tem que ser um número
        return response.status(400).json(new BadRequestError('Data inválida'));
    }

    const money = request.body.money;
    if (!money) {
        return response.status(400).json(new BadRequestError('Dinheiro não informado'));
    }

    const currency = request.body.money.currency;
    if (!currency) {
        return response.status(400).json(new BadRequestError('Moeda não informada'));
    }

    const value = request.body.money.value;
    if (!value) {
        return response.status(400).json(new BadRequestError('Valor não informado'));
    }

    if (isNaN(value)) {
        return response.status(400).json(new BadRequestError('Valor inválido'));
    }

    const transactionType = request.body.transactionType;
    if (!transactionType) {
        return response.status(400).json(new BadRequestError('Tipo de transação não informado'));
    }

    const type = request.body.type;
    if (!type) {
        return response.status(400).json(new BadRequestError('Tipo não informado'));
    }

    if (type != 'income' && type != 'expense') {
        return response.status(400).json(new BadRequestError('Tipo inválido'));
    }

    next();
    
}
