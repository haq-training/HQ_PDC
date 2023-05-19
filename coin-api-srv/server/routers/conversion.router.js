import { Router } from 'express';
import conversionService from '../services/conversion.service.js';
const service = new conversionService();
const routerConversion = Router();

routerConversion.get('/', (req, res) => {
    return service.liste(req, res);
});

export default routerConversion;
