import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '@/postgresqlDB/databases.js';

const User = sequelize.define(
    'user', {
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
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('owner', 'guest'),
            allowNull: true,
        },
        notification: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    }, {
        tableName: 'user',
        timestamps: false,
    }
);

export default User;