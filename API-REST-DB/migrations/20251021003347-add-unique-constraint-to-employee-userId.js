'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Agregar constraint UNIQUE al campo userId en la tabla Employees
    await queryInterface.addConstraint('Employees', {
      fields: ['userId'],
      type: 'unique',
      name: 'unique_employee_userId'
    });
  },

  async down (queryInterface, Sequelize) {
    // Remover el constraint UNIQUE del campo userId
    await queryInterface.removeConstraint('Employees', 'unique_employee_userId');
  }
};
