'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
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
            name: {
                allowNull: true,
                type: Sequelize.STRING(255),
            },
            email: {
                allowNull: true,
                type: Sequelize.STRING(255),
            },
            role: {
                allowNull: true,
                type: Sequelize.ENUM('owner', 'guest'),
            },
            notification: {
                allowNull: true,
                type: Sequelize.BOOLEAN,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user')
    },
}