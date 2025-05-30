import express from 'express';
import admin from 'firebase-admin';
import { authenticateToken } from './middlewares/authenticate-jws.js';
import { TransactionController } from './transactions/controller.js';
import { transactionsRouter } from './transactions/routes.js';

// REST API http://api.controle-de-gastos.com/transactions
const app = express(); // Criou uma aplicação express

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

app.use('/transactions', transactionsRouter); // Cria uma rota base e vai usar as rotas do arquivo 'routes'

// ----- Inicializa a aplicação ----- //
app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'));
