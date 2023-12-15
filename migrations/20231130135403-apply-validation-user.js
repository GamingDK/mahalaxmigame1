'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'name', {
      type: DataTypes.STRING,
      allowNull: false, // or false depending on your requirement
    });

    await queryInterface.changeColumn('users', 'number', {
      type: DataTypes.INTEGER,
      allowNull: false, // or false depending on your requirement
    });

    await queryInterface.changeColumn('users', 'password', {
      type: DataTypes.STRING,
      allowNull: false, // or false depending on your requirement
    });

    await queryInterface.changeColumn('users', 'userId', {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false, // or true depending on your requirement
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
