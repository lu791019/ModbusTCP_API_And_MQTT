'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('notification', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING(255),
            },
            time: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            action: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('notification')
    }
};