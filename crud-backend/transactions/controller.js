import { Transaction } from "./model.js"

// ----- Gets the requests from the server, sends them to the model and return response to the client ----- //
export class TransactionController {

    // Attribute created to allow testing
    #transaction;

    // Creates a new instance of the class Transaction from the model
    constructor (transaction) {
        this.#transaction = transaction || new Transaction();
    };

    // Requests the user's transactions to the model and return them as response
    findByUser (request, response) {
        this.#transaction.user = request.user;

        return  this.#transaction.findByUser().then(transactions => {
                response.status(200).json(transactions);
            }).catch(error => {
                response.status(error.code).json(error);
            });

    };

    // Requests specific transaction to the model and return it as response
    findByUid (request, response) {

        this.#transaction.uid = request.params.uid;
        this.#transaction.user = request.user;

        return this.#transaction.findByUid().then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        });

    };

    // Requests the creation of new transaction to the model and return it as response
    create (request, response) {
        this.#transaction.user = request.user;

        return this.#transaction.create(request.body).then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        });

    };

    // Request the update of a transaction to the model and return it as response
    update (request, response) {
        this.#transaction.uid = request.params.uid;
        this.#transaction.user = request.user;

        return this.#transaction.update(request.body).then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        });

    };

    // Request the remove of a transaction to the model and return as response
    delete (request, response) {
        this.#transaction.uid = request.params.uid;
        this.#transaction.user = request.user;

        return this.#transaction.delete().then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        });

    };

};
