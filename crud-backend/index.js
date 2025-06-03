import express, { json } from 'express';
import admin from 'firebase-admin';
import { transactionsRouter } from './transactions/routes.js';

// REST API http://api.controle-de-gastos.com/transactions
const app = express(); // Criou uma aplicação express

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

app.use(express.json()); // Informa que a aplicação deve tratas as coisas como json

app.use((request, response, next) => { // Para resolver o problema com o CORS (não é a solução segura)
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PATCH,DELETE');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next()
});

app.use('/transactions', transactionsRouter); // Cria uma rota base e vai usar as rotas do arquivo 'routes'

// ----- Inicializa a aplicação ----- //
app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'));
