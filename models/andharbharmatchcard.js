'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AndharBharMatchCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AndharBharMatchCard.init(
    {
      andharBharMatchId: DataTypes.INTEGER,
      cardId: DataTypes.INTEGER,
      type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AndharBharMatchCard",
      tableName: 'andharbharmatchcards'
    }
  );
  return AndharBharMatchCard;
};