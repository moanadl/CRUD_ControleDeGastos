// Recebem as requisições (requests) que chegam pelo servidor e retornam a resposta pro cliente (responses)
import { Transaction } from "./model.js"

export class TransactionController {

    // Esse atributo e o construtor foram criados para possibilitar os testes
    #transaction;

    constructor (transaction) {
        this.#transaction = transaction || new Transaction();
    }

    findByUser (request, response) {
        this.#transaction.user = request.user;
        // console.log('findByUser - Controller');
        // console.log('findByUser - Controller,', this.#transaction.user.uid); // FUNCIONA!!!

        return  this.#transaction.findByUser().then(transactions => {
                // console.log(transactions)
                response.status(200).json(transactions);
            }).catch(error => {
                response.status(error.code).json(error);
            })
    }

    findByUid (request, response) {

        this.#transaction.uid = request.params.uid;
        this.#transaction.user = request.user;
        // console.log('findByUid - Controller');
        //console.log('findByUid - Controller,', this.#transaction.user.uid);

        return this.#transaction.findByUid().then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        });
    }

    create (request, response) {
        this.#transaction.user = request.user;

        return this.#transaction.create(request.body).then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        })
    }

    update (request, response) {
        this.#transaction.uid = request.params.uid;
        this.#transaction.user = request.user;

        return this.#transaction.update(request.body).then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        })
    };

    delete (request, response) {
        this.#transaction.uid = request.params.uid;
        this.#transaction.user = request.user;

        return this.#transaction.delete().then(() => {
            response.status(200).json(this.#transaction);
        }).catch(error => {
            response.status(error.code).json(error);
        })
    }

}
