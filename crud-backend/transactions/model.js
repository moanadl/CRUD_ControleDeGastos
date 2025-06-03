// Contém a lógica e as regras de negócio da aplicação e converte os dados em algo que faz sentido para o negócio
import { TransactionRepository } from './repository.js';
import { UserNotInformedError } from './errors/user-not-informed.error.js';
import { TransactionUidNotInformedError } from './errors/transaction-uid-not-informed.error.js';
import { TransactionNotFoundError } from './errors/transaction-not-found.error.js';
import { UserDoesntOwnTransactionError } from './errors/user-doesnt-own-transaction.error.js';

export class Transaction {

    date;
    description;
    money;
    transactionType;
    type;
    user;

    #repository;

    constructor (transactionRepository) {
        // Caso o argumento 'transactionRepository' tenha sido informado, use ele. Caso contrário use uma instância do TransactionRepository. Isso foi feito para possibilitar o teste
        this.#repository = transactionRepository || new TransactionRepository(); // Vai pegar os dados
    }

    findByUser () {

        // console.log('findByUser - Model');
        // console.log('findByUser - Model,', this.user.uid); // Funciona!!!
        if (!this.user?.uid) {
            return Promise.reject(new UserNotInformedError());
        }

        // console.log(this.#repository.findByUserId(this.user.uid));
        return this.#repository.findByUserUid(this.user.uid);
       
    }

    findByUid () {

        if (!this.uid) {
            return Promise.reject(new TransactionUidNotInformedError());
        }
        // console.log('findByUid - Model');
        console.log('findByUid - Model,', this.user.uid);

        return this.#repository.findByUid(this.uid).then(transactionDB => {
            if (!transactionDB) {
                return Promise.reject(new TransactionNotFoundError());
            };
            if (this.user.uid != transactionDB.user.uid) {
                return Promise.reject(new UserDoesntOwnTransactionError());
            }
            this.date = transactionDB.date;
            this.description = transactionDB.description;
            this.money = transactionDB.money;
            this.transactionType = transactionDB.transactionType;
            this.type = transactionDB.type;
            this.user = transactionDB.user;
        })
    }

    create (params) {
        this.date = params.date;
        this.description = params.description;
        this.money = params.money;
        this.transactionType = params.transactionType;
        this.type = params.type;
        this.user = params.user;
        
        return this.#repository.save(this).then(response => {
            this.uid = response.uid;
        })
    }

    update (params) {

        return this.findByUid(this.uid).then( () => {
            this.date = params.date;
            this.description = params.description;
            this.money = params.money;
            this.transactionType = params.transactionType;
            this.type = params.type;
            this.user = params.user;

            return this.#repository.update(this);

        })
        
    }

    delete () {
        return this.findByUid().then(() => {
            return this.#repository.delete(this);
        })
    }

}
