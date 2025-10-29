'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero eliminamos las columnas existentes
    await queryInterface.removeColumn('ScheduleRequests', 'startDate');
    await queryInterface.removeColumn('ScheduleRequests', 'endDate');

    // Luego añadimos las nuevas columnas
    await queryInterface.addColumn('ScheduleRequests', 'startTime', {
      type: Sequelize.TIME,
      allowNull: false
    });

    await queryInterface.addColumn('ScheduleRequests', 'endTime', {
      type: Sequelize.TIME,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminamos las columnas nuevas
    await queryInterface.removeColumn('ScheduleRequests', 'startTime');
    await queryInterface.removeColumn('ScheduleRequests', 'endTime');

    // Restauramos las columnas originales
    await queryInterface.addColumn('ScheduleRequests', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });

    await queryInterface.addColumn('ScheduleRequests', 'endDate', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });
  }
};
