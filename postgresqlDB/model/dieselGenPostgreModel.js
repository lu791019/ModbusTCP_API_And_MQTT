import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '@/postgresqlDB/databases.js' // 確保從正確的路徑導入您的 Sequelize 實例

const DSG = sequelize.define(
  'dslgen',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    voltageL3toN: {
      type: DataTypes.INTEGER,
    },
    voltageL2toN: {
      type: DataTypes.INTEGER,
    },
    voltageL1toN: {
      type: DataTypes.INTEGER,
    },
    currentL3: {
      type: DataTypes.INTEGER,
    },
    currentL2: {
      type: DataTypes.INTEGER,
    },
    currentL1: {
      type: DataTypes.INTEGER,
    },
    pfL3: {
      type: DataTypes.FLOAT,
    },
    pfL2: {
      type: DataTypes.FLOAT,
    },
    pfL1: {
      type: DataTypes.FLOAT,
    },
    frequency: {
      type: DataTypes.FLOAT,
    },
    apparentPowerL3: {
      type: DataTypes.INTEGER,
    },
    apparentPowerL2: {
      type: DataTypes.INTEGER,
    },
    apparentPowerL1: {
      type: DataTypes.INTEGER,
    },
    activePowerL3: {
      type: DataTypes.INTEGER,
    },
    activePowerL2: {
      type: DataTypes.INTEGER,
    },
    activePowerL1: {
      type: DataTypes.INTEGER,
    },
    reactivePowerL3: {
      type: DataTypes.INTEGER,
    },
    reactivePowerL2: {
      type: DataTypes.INTEGER,
    },
    reactivePowerL1: {
      type: DataTypes.INTEGER,
    },
    speedRPM: {
      type: DataTypes.INTEGER,
    },
    oilPressure: {
      type: DataTypes.INTEGER,
    },
    coolantTemperature: {
      type: DataTypes.INTEGER,
    },
    batteryVoltage: {
      type: DataTypes.FLOAT,
    },
    alarmCode: {
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'dslgen', // Explicitly specify table name
    timestamps: false, // Disable timestamps
    // Other model options
  },
)

export default DSG
