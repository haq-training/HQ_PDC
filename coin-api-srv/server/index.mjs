import express from 'express';
import { createServer } from "http";
import bodyParser from "body-parser";
const app = express();
import fs from "fs";
import routerCategory from "./routers/category.router.js";
import cron from 'cron';
import axios from 'axios';
import { Sequelize ,DataTypes} from "sequelize";

const sequelize = new Sequelize('coin-mysql', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

const Category = sequelize.define('category', {
  category_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'category',
  timestamps: false
});


const job = new cron.CronJob('0 */2 * * * *', async () => {
  try {
    const existingCategories = await Category.findAll({ attributes: ['category_id'] });
    const existingIds = existingCategories.map(category => category.category_id);
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/categories/list');
    const newCategories = response.data.filter(category => !existingIds.includes(category.category_id));
    if (newCategories.length > 0) {
      const createdCategories = await Category.bulkCreate(newCategories, { returning: true });
      createdCategories.forEach(category => {
        console.log(`Inserted row into the category table with id ${category.category_id}.`);
      });
    } else {
      console.log('No new records found.');
    }
  } catch (error) {
    console.log(error);
  }
});


job.start();


fs.readFileSync("./nodemon.json", "utf8", function (err, data) {
  if (error) {
    console.log(error);
  }
  return JSON.parse(data);
});

const httpServer = createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/category", routerCategory);

httpServer.listen(3003);
