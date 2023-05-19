import { DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
    const Collections = sequelize.define(
        'collections',
        {
          idCollection: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              allowNull: false
            },
            nameCollection: {
              type: DataTypes.STRING,
              allowNull: false
            },
            slug: {
              type: DataTypes.STRING,
              allowNull: false
            },
            title: {
              type: DataTypes.STRING,
              allowNull: false
            },
            coverImage: {
              type: DataTypes.STRING,
              allowNull: false
            },
            numberOfArtwork: {
              type: DataTypes.INTEGER,
              allowNull: false
            },
            image: {
              type: DataTypes.STRING,
              allowNull: false
            },
            avatar: {
              type: DataTypes.STRING,
              allowNull: false
            },
            userName: {
              type: DataTypes.STRING,
              allowNull: false
            },
            userSlug: {
              type: DataTypes.STRING,
              allowNull: false
            },
          }, {
            tableName: 'collections',
            timestamps: false
        }
    );
    return Collections;
};
