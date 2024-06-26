import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '@/postgresqlDB/databases.js' // 確保從正確的路徑導入您的 Sequelize 實例

const LidarWind = sequelize.define(
  'lidar_wind',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reference: {
      type: DataTypes.BIGINT,
      unique: true,
    },
    timeAndDate: DataTypes.STRING,
    timestamp: DataTypes.BIGINT,
    infoFlags: DataTypes.STRING,
    statusFlags: DataTypes.STRING,
    batteryVoltage: DataTypes.FLOAT,
    generatorVoltage: DataTypes.FLOAT,
    upperTemp: DataTypes.FLOAT,
    lowerTemp: DataTypes.FLOAT,
    podHumidity: DataTypes.FLOAT,
    gps: DataTypes.STRING,
    metCompassBearing: DataTypes.FLOAT,
    metTilt: DataTypes.FLOAT,
    metAirTemp: DataTypes.FLOAT,
    metPressure: DataTypes.FLOAT,
    metHumidity: DataTypes.FLOAT,
    metWindSpeed: DataTypes.FLOAT,
    metWindDirection: DataTypes.FLOAT,
    raining: DataTypes.BOOLEAN,
    fog: DataTypes.BOOLEAN,
    // 其他字段...
    windDirectionAt300m: DataTypes.FLOAT,
    horizontalWindSpeedAt300m: DataTypes.FLOAT,
    verticalWindSpeedAt300m: DataTypes.FLOAT,
    windDirectionAt250m: DataTypes.FLOAT,
    horizontalWindSpeedAt250m: DataTypes.FLOAT,
    verticalWindSpeedAt250m: DataTypes.FLOAT,
    windDirectionAt200m: DataTypes.FLOAT,
    horizontalWindSpeedAt200m: DataTypes.FLOAT,
    verticalWindSpeedAt200m: DataTypes.FLOAT,
    windDirectionAt140m: DataTypes.FLOAT,
    horizontalWindSpeedAt140m: DataTypes.FLOAT,
    verticalWindSpeedAt140m: DataTypes.FLOAT,
    windDirectionAt100m: DataTypes.FLOAT,
    horizontalWindSpeedAt100m: DataTypes.FLOAT,
    verticalWindSpeedAt100m: DataTypes.FLOAT,
    windDirectionAt70m: DataTypes.FLOAT,
    horizontalWindSpeedAt70m: DataTypes.FLOAT,
    verticalWindSpeedAt70m: DataTypes.FLOAT,
    windDirectionAt50m: DataTypes.FLOAT,
    horizontalWindSpeedAt50m: DataTypes.FLOAT,
    verticalWindSpeedAt50m: DataTypes.FLOAT,
    windDirectionAt38m: DataTypes.FLOAT,
    horizontalWindSpeedAt38m: DataTypes.FLOAT,
    verticalWindSpeedAt38m: DataTypes.FLOAT,
    windDirectionAt30m: DataTypes.FLOAT,
    horizontalWindSpeedAt30m: DataTypes.FLOAT,
    verticalWindSpeedAt30m: DataTypes.FLOAT,
    windDirectionAt20m: DataTypes.FLOAT,
    horizontalWindSpeedAt20m: DataTypes.FLOAT,
    verticalWindSpeedAt20m: DataTypes.FLOAT,
    windDirectionAt10m: DataTypes.FLOAT,
    horizontalWindSpeedAt10m: DataTypes.FLOAT,
    verticalWindSpeedAt10m: DataTypes.FLOAT,
  },
  {
    // Sequelize 配置選項
  },
)

export default LidarWind
