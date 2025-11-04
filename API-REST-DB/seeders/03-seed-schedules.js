'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Schedules', [
      // Horarios para Carolina (Supervisor) - Employee ID 2
      {
        id: 1,
        employeeId: 2,
        date: '2025-11-02',
        startTime: '15:00:00',
        endTime: '20:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Horarios para Alejandro (Cajero) - Employee ID 1
      {
        id: 2,
        employeeId: 1,
        date: '2025-10-07',
        startTime: '17:20:00',
        endTime: '23:34:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Horarios para Federico (Cajero inactivo) - Employee ID 3
      {
        id: 3,
        employeeId: 3,
        date: '2025-10-06',
        startTime: '11:00:00',
        endTime: '19:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Horarios para Valentina (Supervisor) - Employee ID 5
      {
        id: 4,
        employeeId: 5,
        date: '2025-10-02',
        startTime: '13:25:00',
        endTime: '15:50:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Horarios para Maldonado (Cajero) - Employee ID 6
      {
        id: 5,
        employeeId: 6,
        date: '2025-10-01',
        startTime: '10:00:00',
        endTime: '20:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Horarios adicionales para esta semana
      {
        id: 6,
        employeeId: 1, // Alejandro
        date: '2025-11-04',
        startTime: '08:00:00',
        endTime: '16:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        employeeId: 2, // Carolina
        date: '2025-11-05',
        startTime: '14:00:00',
        endTime: '22:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        employeeId: 4, // Carla
        date: '2025-11-06',
        startTime: '09:00:00',
        endTime: '17:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        employeeId: 5, // Valentina
        date: '2025-11-07',
        startTime: '12:00:00',
        endTime: '20:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        employeeId: 6, // Maldonado
        date: '2025-11-08',
        startTime: '07:00:00',
        endTime: '15:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Schedules', null, {});
  }
};