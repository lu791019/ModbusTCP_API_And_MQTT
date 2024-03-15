'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lighting', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      latitude: {
        allowNull: true,
        type: Sequelize.DOUBLE,
      },
      longitude: {
        allowNull: true,
        type: Sequelize.DOUBLE,
      },
      alerts_id: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      alert_type: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      issue_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      issue_time_local: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      embargo_end: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      embargo_end_local: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      event_start: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      event_end: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })

    // Add unique constraint for latitude, longitude, and issue_time
    await queryInterface.addIndex('lighting', ['alerts_id', 'issue_time'], {
      unique: true,
      name: 'lighting_alerts_id_issue_time_unique',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lighting')
  },
}
