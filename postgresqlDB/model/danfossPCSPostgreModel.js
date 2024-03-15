import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '@/postgresqlDB/databases.js' // 確保從正確的路徑導入您的 Sequelize 實例

const Pcs = sequelize.define(
  'danfossPCS',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    energyCounter: {
      type: DataTypes.FLOAT,
    },
    dclinkVoltage: {
      type: DataTypes.FLOAT,
    },
    totalCurrent: {
      type: DataTypes.FLOAT,
    },
    lineFrequency: {
      type: DataTypes.FLOAT,
    },
    referenceFrequency: {
      type: DataTypes.FLOAT,
    },
    oprationMode: {
      type: DataTypes.INTEGER,
    },
    fbFixedStatusWord: {
      type: DataTypes.INTEGER,
    },
    lastActiveWarning: {
      type: DataTypes.INTEGER,
    },
    lastActiveFault: {
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'danfossPCS', // Explicitly specify table name
    timestamps: false, // Disable timestamps
    // Other model options
  },
)

export default Pcs
