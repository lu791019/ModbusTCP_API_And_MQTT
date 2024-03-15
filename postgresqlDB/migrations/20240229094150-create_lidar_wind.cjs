'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lidar_wind', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reference: {
        type: Sequelize.BIGINT,
        unique: true, // 指定為唯一
      },
      timeAndDate: {
        type: Sequelize.STRING,
      },
      timestamp: {
        type: Sequelize.BIGINT,
      },
      infoFlags: {
        type: Sequelize.STRING,
      },
      statusFlags: {
        type: Sequelize.STRING,
      },
      batteryVoltage: {
        type: Sequelize.FLOAT,
      },
      generatorVoltage: {
        type: Sequelize.FLOAT,
      },
      upperTemp: {
        type: Sequelize.FLOAT,
      },
      lowerTemp: {
        type: Sequelize.FLOAT,
      },
      podHumidity: {
        type: Sequelize.FLOAT,
      },
      gps: {
        type: Sequelize.STRING,
      },
      metCompassBearing: {
        type: Sequelize.FLOAT,
      },
      metTilt: {
        type: Sequelize.FLOAT,
      },
      metAirTemp: {
        type: Sequelize.FLOAT,
      },
      metPressure: {
        type: Sequelize.FLOAT,
      },
      metHumidity: {
        type: Sequelize.FLOAT,
      },
      metWindSpeed: {
        type: Sequelize.FLOAT,
      },
      metWindDirection: {
        type: Sequelize.FLOAT,
      },
      raining: {
        type: Sequelize.BOOLEAN,
      },
      fog: {
        type: Sequelize.BOOLEAN,
      },
      // 添加所有風速和風向的具體高度字段
      windDirectionAt300m: Sequelize.FLOAT,
      horizontalWindSpeedAt300m: Sequelize.FLOAT,
      verticalWindSpeedAt300m: Sequelize.FLOAT,
      windDirectionAt250m: Sequelize.FLOAT,
      horizontalWindSpeedAt250m: Sequelize.FLOAT,
      verticalWindSpeedAt250m: Sequelize.FLOAT,
      windDirectionAt200m: Sequelize.FLOAT,
      horizontalWindSpeedAt200m: Sequelize.FLOAT,
      verticalWindSpeedAt200m: Sequelize.FLOAT,
      windDirectionAt140m: Sequelize.FLOAT,
      horizontalWindSpeedAt140m: Sequelize.FLOAT,
      verticalWindSpeedAt140m: Sequelize.FLOAT,
      windDirectionAt100m: Sequelize.FLOAT,
      horizontalWindSpeedAt100m: Sequelize.FLOAT,
      verticalWindSpeedAt100m: Sequelize.FLOAT,
      windDirectionAt70m: Sequelize.FLOAT,
      horizontalWindSpeedAt70m: Sequelize.FLOAT,
      verticalWindSpeedAt70m: Sequelize.FLOAT,
      windDirectionAt50m: Sequelize.FLOAT,
      horizontalWindSpeedAt50m: Sequelize.FLOAT,
      verticalWindSpeedAt50m: Sequelize.FLOAT,
      windDirectionAt38m: Sequelize.FLOAT,
      horizontalWindSpeedAt38m: Sequelize.FLOAT,
      verticalWindSpeedAt38m: Sequelize.FLOAT,
      windDirectionAt30m: Sequelize.FLOAT,
      horizontalWindSpeedAt30m: Sequelize.FLOAT,
      verticalWindSpeedAt30m: Sequelize.FLOAT,
      windDirectionAt20m: Sequelize.FLOAT,
      horizontalWindSpeedAt20m: Sequelize.FLOAT,
      verticalWindSpeedAt20m: Sequelize.FLOAT,
      windDirectionAt10m: Sequelize.FLOAT,
      horizontalWindSpeedAt10m: Sequelize.FLOAT,
      verticalWindSpeedAt10m: Sequelize.FLOAT,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lidar_wind')
  },
}
