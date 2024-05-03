'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meet_greet', {
      event_id: {
        allowNull: false,
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      band_id: {
        type: Sequelize.SMALLINT,
        autoIncrement: true
      },
      meet_start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      meet_end_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      meet_greet_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      }
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('meet_greet');
  }
};