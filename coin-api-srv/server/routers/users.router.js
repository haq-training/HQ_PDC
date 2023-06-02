import { Router } from 'express';
import usersService from '../services/users.service.js';
const service = new usersService();
const routerUsers = Router();

routerUsers.get('/', (req, res) => {
    return service.liste(req, res);
});

routerUsers.post("/register", (req, res) => {
    return service.register(req, res);
  });

routerUsers.get("/login", (req, res) => {
  return service.login(req, res);
});

routerUsers.post("/logout", (req, res) => {
  return service.logout(req, res);
});

export default routerUsers;
