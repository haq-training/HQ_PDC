
export default (sequelize, DataTypes) => {
    const Coin = sequelize.define(
        'coin',
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            internal: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            algorithm: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            proof_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rating: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            technology_adoption_rating: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            market_performance_rating: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            net_hashes_per_second: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
            block_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            block_time: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            block_reward: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            asset_launch_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            max_supply: {
                type: DataTypes.DECIMAL(18, 9),
                allowNull: true,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            document_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'coin',
            timestamps: false,
        }
    );
    return Coin;
};
