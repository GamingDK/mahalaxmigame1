'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AndharBharBetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AndharBharBetting.init({
    andharBharMatchId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AndharBharBetting',
  });
  return AndharBharBetting;
};