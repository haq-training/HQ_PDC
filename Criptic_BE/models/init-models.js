import DataTypes from "sequelize";

import _category from "./category.model.js";

const initModels = (sequelize) => {
  const category = _category(sequelize, DataTypes);
  return { category };
};

export default initModels;
