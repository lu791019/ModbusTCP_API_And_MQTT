'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dslgen', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      voltageL3toN: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      voltageL2toN: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      voltageL1toN: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      currentL3: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      currentL2: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      currentL1: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      pfL3: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      pfL2: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      pfL1: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      frequency: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      apparentPowerL3: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      apparentPowerL2: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      apparentPowerL1: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      activePowerL3: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      activePowerL2: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      activePowerL1: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      reactivePowerL3: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      reactivePowerL2: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      reactivePowerL1: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      speedRPM: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      oilPressure: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      coolantTemperature: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      batteryVoltage: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmCode: {
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
    await queryInterface.dropTable('dslgen')
  },
}
