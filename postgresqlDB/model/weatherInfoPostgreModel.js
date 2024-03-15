import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '@/postgresqlDB/databases.js' // Ensure you import your Sequelize instance from the correct path

const WeatherInfo = sequelize.define(
  'weather_info',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StationName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    StationId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ObservationTime: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    StationLatitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    StationLongitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Weather: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    VisibilityDescription: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SunshineDuration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    WindDirection: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    WindSpeed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    AirTemperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    RelativeHumidity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    AirPressure: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: 'weather_info', // Explicitly specifying the table name
    timestamps: false, // Enabling timestamps to automatically manage `createdAt` and `updatedAt`
    indexes: [
      {
        unique: true,
        fields: ['StationId', 'ObservationTime'],
        name: 'stationid_observationtime_unique',
      },
    ],
    // Other model options
  },
)

export default WeatherInfo
