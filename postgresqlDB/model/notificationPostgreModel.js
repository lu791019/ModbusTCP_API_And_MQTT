import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '@/postgresqlDB/databases.js';

const Notification = sequelize.define(
    'notification', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        time: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        action: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
    }, {
        tableName: 'notification',
        timestamps: false,
    }
);

export default Notification;