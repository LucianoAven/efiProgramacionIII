'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ScheduleRequests', [
      // Solicitud pendiente de Alejandro
      {
        id: 1,
        employeeId: 1, // Alejandro Martínez
        currentScheduleId: 2, // Su horario actual del 2025-10-07
        requestedDate: '2025-11-10',
        requestedStartTime: '10:00:00',
        requestedEndTime: '18:00:00',
        reason: 'Solicito cambio de horario para poder asistir a una cita médica en la tarde.',
        status: 'pendiente',
        requestDate: new Date('2025-11-01'),
        createdAt: new Date('2025-11-01'),
        updatedAt: new Date('2025-11-01')
      },
      
      // Solicitud aprobada de Carolina
      {
        id: 2,
        employeeId: 2, // Carolina Silva
        currentScheduleId: 1, // Su horario actual del 2025-11-02
        requestedDate: '2025-11-12',
        requestedStartTime: '09:00:00',
        requestedEndTime: '17:00:00',
        reason: 'Necesito cambiar mi horario para coordinarlo con el turno de mi compañero.',
        status: 'aprobada',
        requestDate: new Date('2025-10-30'),
        responseDate: new Date('2025-11-01'),
        adminComment: 'Aprobado. El cambio está coordinado con el supervisor.',
        createdAt: new Date('2025-10-30'),
        updatedAt: new Date('2025-11-01')
      },
      
      // Solicitud rechazada de Carla
      {
        id: 3,
        employeeId: 4, // Carla Fernández
        currentScheduleId: 8, // Su horario del 2025-11-06
        requestedDate: '2025-11-15',
        requestedStartTime: '16:00:00',
        requestedEndTime: '22:00:00',
        reason: 'Solicito horario vespertino por motivos personales.',
        status: 'rechazada',
        requestDate: new Date('2025-10-28'),
        responseDate: new Date('2025-10-31'),
        adminComment: 'No aprobado. No hay disponibilidad en el turno vespertino para esa fecha.',
        createdAt: new Date('2025-10-28'),
        updatedAt: new Date('2025-10-31')
      },
      
      // Solicitud pendiente de Valentina
      {
        id: 4,
        employeeId: 5, // Valentina Ruiz
        currentScheduleId: 4, // Su horario del 2025-10-02
        requestedDate: '2025-11-18',
        requestedStartTime: '08:00:00',
        requestedEndTime: '14:00:00',
        reason: 'Solicito horario matutino para poder estudiar en la tarde.',
        status: 'pendiente',
        requestDate: new Date('2025-11-02'),
        createdAt: new Date('2025-11-02'),
        updatedAt: new Date('2025-11-02')
      },
      
      // Solicitud aprobada antigua de Maldonado
      {
        id: 5,
        employeeId: 6, // Maldonado Pérez
        currentScheduleId: 5, // Su horario del 2025-10-01
        requestedDate: '2025-11-20',
        requestedStartTime: '06:00:00',
        requestedEndTime: '14:00:00',
        reason: 'Solicito horario temprano para poder asistir a clases universitarias.',
        status: 'aprobada',
        requestDate: new Date('2025-10-25'),
        responseDate: new Date('2025-10-29'),
        adminComment: 'Aprobado. El horario temprano está disponible.',
        createdAt: new Date('2025-10-25'),
        updatedAt: new Date('2025-10-29')
      },
      
      // Otra solicitud pendiente de Alejandro
      {
        id: 6,
        employeeId: 1, // Alejandro Martínez
        currentScheduleId: 6, // Su horario del 2025-11-04
        requestedDate: '2025-11-25',
        requestedStartTime: '14:00:00',
        requestedEndTime: '20:00:00',
        reason: 'Solicito cambio para el turno de tarde durante la semana de Black Friday.',
        status: 'pendiente',
        requestDate: new Date('2025-11-03'),
        createdAt: new Date('2025-11-03'),
        updatedAt: new Date('2025-11-03')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ScheduleRequests', null, {});
  }
};
