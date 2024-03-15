'use strict'

const { QueryInterface, Sequelize } = require('sequelize')

/**
 * @typedef {import('sequelize').QueryInterface} QueryInterface
 * @typedef {import('sequelize').Sequelize} Sequelize
 */

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('public.skysails', {
      fields: ['name', 'updatedAt'],
      name: 'idx_name_updatedAt',
    })
  },

  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('public.skysails', 'idx_name_updatedAt')
  },
}
