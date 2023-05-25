import { Sequelize } from "sequelize";
import models from "./init-models.js";
import * as dotenv from "dotenv";
dotenv.config();
const db = new Sequelize(
  process.env.DB_ENV,
  process.env.ACCOUNT_ENV,
  process.env.PASSWORD_ENV,
  {
    username: 'root', // Tên người dùng MySQL
    password: '123456', // Mật khẩu của người dùng MySQL
    database: 'coin-mysql', // Tên cơ sở dữ liệu
    dialect: 'mysql',
  }
);
try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const getDatabase = models(db);

export default getDatabase;
