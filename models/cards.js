'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cards.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    value: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cards',
  });
  return Cards;
};