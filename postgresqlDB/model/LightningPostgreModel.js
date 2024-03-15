import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '@/postgresqlDB/databases.js' // Ensure you import your Sequelize instance from the correct path

const lighting = sequelize.define(
  'lighting',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    alerts_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    alert_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    issue_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    issue_time_local: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    embargo_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    embargo_end_local: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    event_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    event_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'lighting', // 显式指定表名
    timestamps: false, // 启用时间戳以自动管理 `createdAt` 和 `updatedAt`
    indexes: [
      {
        unique: true,
        fields: ['alerts_id', 'issue_time'],
        name: 'alerts_id_issue_time_unique',
      },
    ],
    // 其他模型选项
  },
)

export default lighting
