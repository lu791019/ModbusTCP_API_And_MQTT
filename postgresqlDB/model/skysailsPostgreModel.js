import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '@/postgresqlDB/databases.js' // 確保從正確的路徑導入您的 Sequelize 實例

const Skysails = sequelize.define(
  'skysails',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'skysails', // 明確指定表名
    timestamps: false, // 禁用時間戳記
    // 其他模型選項
  },
)

export default Skysails
