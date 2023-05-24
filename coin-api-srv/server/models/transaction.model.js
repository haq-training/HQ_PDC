

export default (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        'transaction',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            transactionType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            symbol: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            balance: {
                type: DataTypes.DECIMAL(18, 8),
                allowNull: false,
            },
            usdBalance: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'transaction',
            timestamps: false,
        }
    );
    return Transaction;
};
