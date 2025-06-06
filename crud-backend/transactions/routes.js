import express, { response } from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from '../middlewares/authenticate-jws.js';
import { TransactionController } from './controller.js';
import { validateTransaction } from './validators/create-transaction.validator.js';

// Creates app using express
const app = express();

// Creates a new instance of the class TransactionController from the controller
const transactionController = new TransactionController();

// ----- Routes ----- //

app.get('/', 
    (request, response, next) => authenticateToken(request, response, next, admin.auth()), 
    (request, response) => transactionController.findByUser(request, response)
);

app.get('/:uid',
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => transactionController.findByUid(request, response)
);

app.post('/',
    (request, response, next) => validateTransaction(request, response, next),
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => transactionController.create(request, response)
);

app.patch('/:uid',
    (request, response, next) => validateTransaction(request, response, next),
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => transactionController.update(request, response)
);

app.delete('/:uid',
    (request, response, next) => authenticateToken(request, response, next, admin.auth()),
    (request, response) => transactionController.delete(request, response)
);

export const transactionsRouter = app;
