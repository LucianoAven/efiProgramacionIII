'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Función para hashear contraseñas individuales
    const hashPassword = async (password) => await bcrypt.hash(password, 10);
    
    await queryInterface.bulkInsert('Users', [
      // Administradores
      {
        id: 1,
        name: 'Pedro Rodríguez',
        email: 'pedrose@gmail.com',
        password: await hashPassword('pedrose'),
        rol: 'admin',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'María García',
        email: 'maria@gmail.com',
        password: await hashPassword('maria'),
        rol: 'admin',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Juanos López',
        email: 'juanos@gmail.com',
        password: await hashPassword('juanos'),
        rol: 'admin',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Bonifacio Torres',
        email: 'bonifacio@gmail.com',
        password: await hashPassword('bonifacio'),
        rol: 'admin',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Empleados
      {
        id: 5,
        name: 'Alejandro Martínez',
        email: 'alejandro@gmail.com',
        password: await hashPassword('alejandro'),
        rol: 'empleado',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Carolina Silva',
        email: 'carolina@gmail.com',
        password: await hashPassword('carolina'),
        rol: 'empleado',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Federico Morales',
        email: 'fede@gmail.com',
        password: await hashPassword('fede'),
        rol: 'empleado',
        is_active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Carla Fernández',
        email: 'carla@gmail.com',
        password: await hashPassword('carla'),
        rol: 'empleado',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Valentina Ruiz',
        email: 'valentina@gmail.com',
        password: await hashPassword('valentina'),
        rol: 'empleado',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Maldonado Pérez',
        email: 'maldonado@gmail.com',
        password: await hashPassword('maldonado'),
        rol: 'empleado',
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};