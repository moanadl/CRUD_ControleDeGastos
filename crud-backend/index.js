import express, { json } from 'express';
import admin from 'firebase-admin';
import { transactionsRouter } from './transactions/routes.js';

// ----- Creates app with Express ----- //
const app = express();

admin.initializeApp({
  credential: admin.credential.cert("serviceAccountKey.json")
});

// Informs that the app must treat data as json
app.use(express.json());

// To solve CORS problem (not a safe solution)
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PATCH,DELETE');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next()
});

// ----- Creates a base route ----- //
app.use('/transactions', transactionsRouter);

// ----- Initialize the app ----- //
app.listen(3000, () => console.log('API rest iniciada em http://localhost:3000'));
