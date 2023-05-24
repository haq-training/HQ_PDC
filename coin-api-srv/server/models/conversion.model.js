
export default (sequelize, DataTypes) => {
    const Conversion = sequelize.define(
        'conversion',
        {
            coin_id: {
              type: DataTypes.STRING,
              primaryKey: true,
              allowNull: false
            },
            conversion: {
              type: DataTypes.STRING,
              allowNull: false
            },
            conversion_symbol: {
              type: DataTypes.STRING,
              allowNull: false
            },
            currency_from: {
              type: DataTypes.STRING,
              allowNull: false
            },
            currency_to: {
              type: DataTypes.STRING,
              allowNull: false
            },
            market: {
              type: DataTypes.STRING,
              allowNull: false
            },
            supply: {
              type: DataTypes.INTEGER,
              allowNull: false
            },
            mkt_cap_penalty: {
              type: DataTypes.INTEGER,
              allowNull: false
            },
            total_volume_24h: {
              type: DataTypes.DECIMAL(18, 9),
              allowNull: false
            },
            total_toptier_volume_24h: {
              type: DataTypes.DECIMAL(18, 9),
              allowNull: false
            },
            sub_base: {
              type: DataTypes.STRING,
              allowNull: false
            },
            subs_needed: {
              type: DataTypes.TEXT,
              allowNull: true
            },
            raw_data: {
              type: DataTypes.TEXT,
              allowNull: false
            },
            direct_pair_available: {
              type: DataTypes.BOOLEAN,
              allowNull: false
            }
          }, {
            tableName: 'conversion',
            timestamps: false
        }
    );
    return Conversion;
};
