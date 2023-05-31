import express from 'express';
import { createServer } from "http";
import bodyParser from "body-parser";
import fs from "fs";
import { syncDatabase } from "./loader/mysql.js";
import routerCoin from './routers/coin.router.js';
import routerUsers from './routers/users.router.js';
import routerConversion from './routers/conversion.router.js';
import routerCollections from './routers/collections.router.js';
import routerTransaction from './routers/transaction.router.js';

fs.readFileSync("./nodemon.json", "utf8", function (error, data) {
  if (error) {
    console.log(error);
  }
  return JSON.parse(data);
});

async function startServer() {
  const app = express();
  await Promise.all([syncDatabase()]);
  const httpServer = createServer(app);
  await app.use(bodyParser.json());
  await app.use(bodyParser.urlencoded({ extended: true }));

  await app.use("/coin", routerCoin);
  await app.use("/users", routerUsers);
  await app.use("/conversion", routerConversion);
  await app.use("/collections", routerCollections);
  await app.use("/transaction", routerTransaction);

  await httpServer.listen(3006);
}

startServer().catch((error) => {
  console.error('Unable start server: ', error);
});


