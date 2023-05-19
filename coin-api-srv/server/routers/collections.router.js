import { Router } from 'express';
import collectionsService from '../services/collections.service.js';
const service = new collectionsService();
const routerCollections = Router();

routerCollections.get('/', (req, res) => {
    return service.liste(req, res);
});

export default routerCollections;
