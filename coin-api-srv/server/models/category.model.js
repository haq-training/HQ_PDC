export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
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
    }
  );
  return Category;
};
