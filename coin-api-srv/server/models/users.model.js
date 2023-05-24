

export default (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userPass: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'users',
            timestamps: false,
        }
    );
    return Users;
};
