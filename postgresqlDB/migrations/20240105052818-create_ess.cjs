module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ess', {
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
      stringNumber: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      circuitBreakerStatus: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      totalVoltage: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      totalCurrent: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      soc: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      soh: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      maxBatteryVoltage: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      minBatteryVoltage: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      maxBatteryTemperature: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      minBatteryTemperature: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      rechargeableCapacity: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      dischargeableCapacity: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      allowableMaxDischargePower: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      allowableMaxChargePower: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      allowableMaxDischargeCurrent: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      allowableMaxChargeCurrent: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      operatingTemperature: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      systemState: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      chargeState: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      systemInsulationR: {
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
    await queryInterface.dropTable('ess')
  },
}
