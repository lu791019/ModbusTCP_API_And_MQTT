'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('weather_risk_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      times: {
        type: Sequelize.STRING,
        unique: true,
      },
      pcpn: {
        type: Sequelize.FLOAT,
      },
      pres: {
        type: Sequelize.FLOAT,
      },
      rh: {
        type: Sequelize.FLOAT,
      },
      temp: {
        type: Sequelize.FLOAT,
      },
      cloud: {
        type: Sequelize.FLOAT,
      },
      gust: {
        type: Sequelize.FLOAT,
      },
      wind_speed: {
        type: Sequelize.FLOAT,
      },
      wind_dir: {
        type: Sequelize.INTEGER,
      },
      wind_speed_40m: {
        type: Sequelize.FLOAT,
      },
      wind_dir_40m: {
        type: Sequelize.INTEGER,
      },
      wind_speed_80m: {
        type: Sequelize.FLOAT,
      },
      wind_dir_80m: {
        type: Sequelize.INTEGER,
      },
      wind_speed_100m: {
        type: Sequelize.FLOAT,
      },
      wind_dir_100m: {
        type: Sequelize.INTEGER,
      },
      wind_speed_200m: {
        type: Sequelize.FLOAT,
      },
      wind_dir_200m: {
        type: Sequelize.INTEGER,
      },
      wind_speed_250m: {
        type: Sequelize.FLOAT,
      },
      wind_dir_250m: {
        type: Sequelize.INTEGER,
      },
      wind_speed_300m: {
        type: Sequelize.FLOAT,
      },
      wind_dir_300m: {
        type: Sequelize.INTEGER,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('weather_risk_info')
  },
}
