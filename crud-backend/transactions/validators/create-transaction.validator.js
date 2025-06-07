import { BadRequestError } from "../errors/bad-request.error.js";

// ----- Validates input values ----- //
export function validateTransaction (request, response, next) {

    // Checks if date is not empty and in the right format
    const date = request.body.date;
    if (!date) {
        return response.status(400).json(new BadRequestError('Data não informada'));
    };

    if (isNaN(new Date(date))) {
        return response.status(400).json(new BadRequestError('Data inválida'));
    };

    // Checks if money is not empty valid and in the right format
    const money = request.body.money;
    if (!money) {
        return response.status(400).json(new BadRequestError('Dinheiro não informado'));
    };

    const currency = request.body.money.currency;
    if (!currency) {
        return response.status(400).json(new BadRequestError('Moeda não informada'));
    };

    const value = request.body.money.value;
    if (!value) {
        return response.status(400).json(new BadRequestError('Valor não informado'));
    };

    if (isNaN(value)) {
        return response.status(400).json(new BadRequestError('Valor inválido'));
    };

    // Checks if transaction type is selected
    const transactionType = request.body.transactionType;
    if (!transactionType) {
        return response.status(400).json(new BadRequestError('Tipo de transação não informado'));
    };

    // Checks if type is selected and is either 'income' or 'expense'
    const type = request.body.type;
    if (!type) {
        return response.status(400).json(new BadRequestError('Tipo não informado'));
    };

    if (type != 'income' && type != 'expense') {
        return response.status(400).json(new BadRequestError('Tipo inválido'));
    };

    next();
    
};
