'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weather_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      StationName: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      StationId: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      ObservationTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      StationLatitude: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      StationLongitude: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      Weather: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      VisibilityDescription: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      SunshineDuration: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      WindDirection: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      WindSpeed: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      AirTemperature: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      RelativeHumidity: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      AirPressure: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
    })

    // Add unique constraint for StationId and ObservationTime
    await queryInterface.addIndex('weather_info', ['StationId', 'ObservationTime'], {
      unique: true,
      name: 'weather_info_stationid_observationtime_unique',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('weather_info')
  },
}
