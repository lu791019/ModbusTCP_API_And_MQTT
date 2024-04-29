import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '@/postgresqlDB/databases.js' // 確保從正確的路徑導入您的 Sequelize 實例

const Eticaenv = sequelize.define(
  'eticaenv',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    heartBeat: {
      type: DataTypes.INTEGER,
    },
    tempHumi_tempA1: {
      type: DataTypes.FLOAT,
    },
    tempHumi_tempA2: {
      type: DataTypes.FLOAT,
    },
    tempHumi_humiA1: {
      type: DataTypes.FLOAT,
    },
    tempHumi_humiA2: {
      type: DataTypes.FLOAT,
    },
    alarmList_ContainerIO_warning: {
      type: DataTypes.FLOAT,
    },
    alarmList_ContainerIO_protection: {
      type: DataTypes.FLOAT,
    },
    alarmList_ContainerIO2_warning: {
      type: DataTypes.FLOAT,
    },
    alarmList_ContainerIO2_protection: {
      type: DataTypes.FLOAT,
    },
    alarmList_tempHumi_warning: {
      type: DataTypes.FLOAT,
    },
    alarmList_tempHumi_protection: {
      type: DataTypes.FLOAT,
    },
    alarmList_hydrogenSensor_warning: {
      type: DataTypes.FLOAT,
    },
    alarmList_hydrogenSensor_protection: {
      type: DataTypes.FLOAT,
    },
    alarmList_meter_warning: {
      type: DataTypes.FLOAT,
    },
    alarmList_meter_protection: {
      type: DataTypes.FLOAT,
    },
    alarmList_containerUPS_warning: {
      type: DataTypes.FLOAT,
    },
    alarmList_containerUPS_protection: {
      type: DataTypes.FLOAT,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'eticaenv', // Explicitly specify table name
    timestamps: false, // Disable timestamps
    // Other model options
  },
)

export default Eticaenv
