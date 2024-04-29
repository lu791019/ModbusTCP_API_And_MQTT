'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('eticaenv', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      heartBeat: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      tempA1: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      tempA2: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      humiA1: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      humiA2: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_ContainerIO_warning: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_ContainerIO_protection: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_ContainerIO2_warning: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_ContainerIO2_protection: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_tempHumi_warning: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_tempHumi_protection: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_hydrogenSensor_warning: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_hydrogenSensor_protection: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_meter_warning: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_meter_protection: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_containerUPS_warning: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      alarmList_containerUPS_protection: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('eticaenv')
  },
}
