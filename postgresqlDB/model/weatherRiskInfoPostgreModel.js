import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '@/postgresqlDB/databases.js'

const WeatherRiskInfo = sequelize.define(
  'weather_risk_info',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    times: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pcpn: {
      type: DataTypes.FLOAT,
    },
    pres: {
      type: DataTypes.FLOAT,
    },
    rh: {
      type: DataTypes.FLOAT,
    },
    temp: {
      type: DataTypes.FLOAT,
    },
    cloud: {
      type: DataTypes.FLOAT,
    },
    gust: {
      type: DataTypes.FLOAT,
    },
    wind_speed: {
      type: DataTypes.FLOAT,
    },
    wind_dir: {
      type: DataTypes.INTEGER,
    },
    wind_speed_40m: {
      type: DataTypes.FLOAT,
    },
    wind_dir_40m: {
      type: DataTypes.INTEGER,
    },
    wind_speed_80m: {
      type: DataTypes.FLOAT,
    },
    wind_dir_80m: {
      type: DataTypes.INTEGER,
    },
    wind_speed_100m: {
      type: DataTypes.FLOAT,
    },
    wind_dir_100m: {
      type: DataTypes.INTEGER,
    },
    wind_speed_200m: {
      type: DataTypes.FLOAT,
    },
    wind_dir_200m: {
      type: DataTypes.INTEGER,
    },
    wind_speed_250m: {
      type: DataTypes.FLOAT,
    },
    wind_dir_250m: {
      type: DataTypes.INTEGER,
    },
    wind_speed_300m: {
      type: DataTypes.FLOAT,
    },
    wind_dir_300m: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // Sequelize的其他模型参数
    tableName: 'weather_risk_info', // 明確指定表名
    timestamps: false, // 禁用時間戳記
  },
)

export default WeatherRiskInfo
