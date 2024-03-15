'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('skysails', {
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
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      value: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('skysails')
  },
}
