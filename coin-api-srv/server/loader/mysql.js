import { Sequelize } from 'sequelize';
import initModels from '../models/init-models';
import { getDatabase } from '../models/config';

import coin from '../dev_data/coin.json';
import user from '../dev_data/user.json';
import collections from '../dev_data/collections.json';
import conversion from '../dev_data/conversion.json';
import transaction from '../dev_data/transaction.json';

export const sequelize = new Sequelize(getDatabase.username, getDatabase.password, getDatabase.database);

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
                    await models.user.bulkCreate(user);
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

export * as coinDB from '../../models/init-models';
