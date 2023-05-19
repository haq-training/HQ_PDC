import { Router } from 'express';
import usersService from '../services/users.service.js';
const service = new usersService();
const routerUsers = Router();

routerUsers.get('/', (req, res) => {
    return service.liste(req, res);
});

export default routerUsers;
