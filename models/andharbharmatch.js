'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AndharBharMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AndharBharMatch.init(
    {
      cardId: DataTypes.INTEGER,
      win: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AndharBharMatch",
      tableName:'andharbharmatches'
    }
  );
  return AndharBharMatch;
};