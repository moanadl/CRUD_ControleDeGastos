import { TransactionRepository } from './repository.js';
import { UserNotInformedError } from './errors/user-not-informed.error.js';
import { TransactionUidNotInformedError } from './errors/transaction-uid-not-informed.error.js';
import { TransactionNotFoundError } from './errors/transaction-not-found.error.js';
import { UserDoesntOwnTransactionError } from './errors/user-doesnt-own-transaction.error.js';

// ----- Contains the logic and the rules of the application and convert data ----- //
// Gets the requests from the controller and send them to the repository
export class Transaction {

    date;
    description;
    money;
    transactionType;
    type;
    uid;
    user;

    // Attribute created to allow testing
    #repository;

    // Creates a new instance of the class TransactionRepository from the repository
    constructor (transactionRepository) {
        this.#repository = transactionRepository || new TransactionRepository();
    };

    // Calls repository to find user's transactions
    findByUser () {

        // Checks if user is logged in
        if (!this.user?.uid) {
            return Promise.reject(new UserNotInformedError());
        };

        // Return transactions to the model
        return this.#repository.findByUserUid(this.user.uid);
       
    };

    // Calls repository to find specific transaction
    findByUid () {

        // Checks if transaction exists
        if (!this.uid) {
            return Promise.reject(new TransactionUidNotInformedError());
        };

        // Return transaction data to the model
        return this.#repository.findByUid(this.uid).then(transactionDB => {
            
            // Checks if transaction was returned from repository
            if (!transactionDB) {
                return Promise.reject(new TransactionNotFoundError());
            };

            // Checks if transaction owner is the same as the user logged in
            if (this.user.uid != transactionDB.user.uid) {
                return Promise.reject(new UserDoesntOwnTransactionError());
            };

            // Returns transaction data to model
            this.date = transactionDB.date;
            this.description = transactionDB.description;
            this.money = transactionDB.money;
            this.transactionType = transactionDB.transactionType;
            this.type = transactionDB.type;
            this.user = transactionDB.user;

        });

    };

    // Calls repository to create a new transaction with params sent from controller
    create (params) {
        this.date = params.date;
        this.description = params.description;
        this.money = params.money;
        this.transactionType = params.transactionType;
        this.type = params.type;
        this.user = params.user;
        
        // Returns new transaction to the model
        return this.#repository.save(this).then(response => {
            this.uid = response.uid;
        });

    };

    // Calls repository to update transaction with params sent from controller
    update (params) {

        return this.findByUid(this.uid).then( () => {
            this.date = params.date;
            this.description = params.description;
            this.money = params.money;
            this.transactionType = params.transactionType;
            this.type = params.type;

            // Returns updated transaction to the model
            return this.#repository.update(this);

        });
        
    };

    // Calls repository to remove transaction 
    delete () {
        return this.findByUid().then(() => {
            return this.#repository.delete(this);
        });
    };

};
