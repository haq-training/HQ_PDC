import { Router } from 'express';
import transactionService from '../services/collections.service.js';
const service = new transactionService();
const routerTransaction = Router();

routerTransaction.get('/', (req, res) => {
    return service.liste(req, res);
});

export default routerTransaction;
