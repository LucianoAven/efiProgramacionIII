const { Sequelize } = require('sequelize');
require('dotenv').config();

// Usar variables de entorno (definidas en Render)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // por si no está definida
    dialect: 'mysql',

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

    logging: console.log, // opcional, evita mostrar logs SQL
  }
);

module.exports = sequelize;


/* 
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('crud_db', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize
 */