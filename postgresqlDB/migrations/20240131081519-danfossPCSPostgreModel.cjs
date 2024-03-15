'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('danfossPCS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      energyCounter: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      dclinkVoltage: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      totalCurrent: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      lineFrequency: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      referenceFrequency: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      oprationMode: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      fbFixedStatusWord: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      lastActiveWarning: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      lastActiveFault: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('danfossPCS')
  },
}
