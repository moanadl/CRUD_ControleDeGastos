// Contém a lógica e as regras de negócio da aplicação e converte os dados em algo que faz sentido para o negócio
import admin from 'firebase-admin';
import { TransactionRepository } from './repository.js';

export class Transaction {

    date;
    description;
    money;
    transactionType;
    type;
    user;

    #repository;

    constructor () {
        this.#repository = new TransactionRepository(); // Vai pegar os dados
    }

    findByUser () {

        if (!this.user?.uid) {
            return Promise.reject({
                code: 500,
                message: 'Usuário não informado'
            });
        }

        console.log(this.#repository.findByUserId(this.user.uid));
        return this.#repository.findByUserId(this.user.uid);
       
    }
}
