import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '@/postgresqlDB/databases.js' // 確保從正確的路徑導入您的 Sequelize 實例

const Ess = sequelize.define(
  'ess',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    heartBeat: {
      type: DataTypes.INTEGER,
    },
    stringNumber: {
      type: DataTypes.INTEGER,
    },
    circuitBreakerStatus: {
      type: DataTypes.INTEGER,
    },
    totalVoltage: {
      type: DataTypes.FLOAT,
    },
    totalCurrent: {
      type: DataTypes.FLOAT,
    },
    soc: {
      type: DataTypes.INTEGER,
    },
    soh: {
      type: DataTypes.INTEGER,
    },
    maxBatteryVoltage: {
      type: DataTypes.FLOAT,
    },
    minBatteryVoltage: {
      type: DataTypes.FLOAT,
    },
    maxBatteryTemperature: {
      type: DataTypes.INTEGER,
    },
    minBatteryTemperature: {
      type: DataTypes.INTEGER,
    },
    rechargeableCapacity: {
      type: DataTypes.FLOAT,
    },
    dischargeableCapacity: {
      type: DataTypes.FLOAT,
    },
    allowableMaxDischargePower: {
      type: DataTypes.INTEGER,
    },
    allowableMaxChargePower: {
      type: DataTypes.INTEGER,
    },
    allowableMaxDischargeCurrent: {
      type: DataTypes.FLOAT,
    },
    allowableMaxChargeCurrent: {
      type: DataTypes.FLOAT,
    },
    operatingTemperature: {
      type: DataTypes.INTEGER,
    },
    systemState: {
      type: DataTypes.INTEGER,
    },
    chargeState: {
      type: DataTypes.INTEGER,
    },
    systemInsulationR: {
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'ess', // 明確指定表名
    timestamps: false, // 禁用時間戳記
    // 其他模型選項
  },
)

export default Ess
