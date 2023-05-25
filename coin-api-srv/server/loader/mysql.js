import { Sequelize } from 'sequelize';
import fs from "fs";
import {database} from '../models/config.js';
import {initModels} from '../models/init-models.js';

// import coin from '../dev_data/coin.json' assert { type: 'json' };
// import user from '../dev_data/user.json' assert { type: 'json' };
// import collections from '../dev_data/collections.json' assert { type: 'json' };
// import conversion from '../dev_data/conversion.json' assert { type: 'json' };
// import transaction from '../dev_data/transaction.json' assert { type: 'json' };

const coin = JSON.parse(fs.readFileSync('dev_data/coin.json'));
const user = JSON.parse(fs.readFileSync('dev_data/user.json'));
const collections = JSON.parse(fs.readFileSync('dev_data/collections.json'));
const conversion = JSON.parse(fs.readFileSync('dev_data/conversion.json'));
const transaction = JSON.parse(fs.readFileSync('dev_data/transaction.json'));
console.log(coin);
console.log(user);
console.log(collections);
console.log(conversion);
console.log(transaction);

export const sequelize = new Sequelize( database.db_name,database.db_user, database.db_password,{ ...database.option});

const models = initModels(sequelize);

export const syncDatabase = async () => {
    if (process.env.NODE_ENV === 'development' && process.env.SYNC_DATA === 'true') {
        const isForceSync = process.env.SYNC_DATA === 'true';
        await sequelize
            .sync({ force: isForceSync, alter: true })
            .then(() => {
                console.log('Database sync is done!');
            })
            .then(async () => {
                if (isForceSync) {
                    await models.users.bulkCreate(user);
                    await models.coin.bulkCreate(coin);
                    await models.collections.bulkCreate(collections);
                    await models.conversion.bulkCreate(conversion);
                    await models.transaction.bulkCreate(transaction);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

export * as coinDB from '../models/init-models.js';
