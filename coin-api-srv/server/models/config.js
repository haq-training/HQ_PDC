import * as dotenv from "dotenv";
dotenv.config();

const mysql_option = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export const database = {
  db_name: process.env.MYSQL_NAME || 'coin-mysql',
  db_user: process.env.MYSQL_USER || 'root',
  db_password: process.env.MYSQL_PASSWORD || '123456',
  option: mysql_option,
};