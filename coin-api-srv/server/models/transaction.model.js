

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
               
            },
            createdAt: {
                type: DataTypes.DATE,
               
            },
            symbol: {
                type: DataTypes.STRING,
                
            },
            status: {
                type: DataTypes.STRING,
              
            },
            address: {
                type: DataTypes.STRING,
               
            },
            balance: {
                type: DataTypes.DECIMAL(18, 8),
                
            },
            usdBalance: {
                type: DataTypes.STRING,
                
            },
        },
        {
            tableName: 'transaction',
            timestamps: false,
        }
    );
    return Transaction;
};
