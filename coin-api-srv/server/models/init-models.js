import DataTypes from 'sequelize';

import _coin from './coin.model.js';
import _users from './users.model.js';
import _conversion from './conversion.model.js';
import _collections from './collections.model.js';
import _transaction from './transaction.model.js';

const initModels = (sequelize) => {
    const coin = _coin(sequelize, DataTypes);
    const users = _users(sequelize, DataTypes);
    const conversion = _conversion(sequelize, DataTypes);
    const collections = _collections(sequelize, DataTypes);
    const transaction = _transaction(sequelize, DataTypes);
    return { coin, users, conversion, collections, transaction };
};

export default initModels;
