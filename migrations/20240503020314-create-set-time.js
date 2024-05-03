'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('set_time', {
      event_id: {
        allowNull: false,
        type: Sequelize.SMALLINT,
        primaryKey: true,
        autoIncrement: true
      },
      stage_id: {
        type: Sequelize.SMALLINT,
        autoIncrement: true
      },
      band_id: {
        type: Sequelize.SMALLINT,
        autoIncrement: true
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      set_time_id: {
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
    await queryInterface.dropTable('set_time');
  }
};