'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Employees', [
      // Empleados activos
      {
        id: 1,
        userId: 5, // Alejandro Martínez
        position: 'cajero',
        hiringDate: new Date('2024-01-15'),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 6, // Carolina Silva
        position: 'supervisor',
        hiringDate: new Date('2024-02-01'),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 7, // Federico Morales
        position: 'cajero',
        hiringDate: new Date('2024-03-10'),
        status: false, // Empleado inactivo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 8, // Carla Fernández
        position: 'cajero',
        hiringDate: new Date('2024-04-05'),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 9, // Valentina Ruiz
        position: 'supervisor',
        hiringDate: new Date('2024-05-20'),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        userId: 10, // Maldonado Pérez
        position: 'cajero',
        hiringDate: new Date('2024-06-01'),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};