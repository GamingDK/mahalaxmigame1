'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WalletHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WalletHistory.init(
    {
      amount: DataTypes.INTEGER,
      flow: DataTypes.ENUM("credit", "debit"),
      type: DataTypes.STRING,
      userId:DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "WalletHistory",
      tableName:'wallethistories'
    }
  );
  return WalletHistory;
};