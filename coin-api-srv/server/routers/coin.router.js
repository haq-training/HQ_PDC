import { Router } from 'express';
import coinService from '../services/coin.service.js';
const service = new coinService();
const routerCoin = Router();

routerCoin.get('/', (req, res) => {
    return service.liste(req, res);
});

export default routerCoin;
