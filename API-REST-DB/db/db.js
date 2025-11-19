const { Sequelize } = require('sequelize');
require('dotenv').config();


// Configuración para producción (Render + Clever Cloud)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false, // Desactivar logs en producción
  }
);

// Configuración local (comentada para producción)
/*
const sequelize = new Sequelize('crud_db3', 'root', 'root1234', {
    host: 'localhost',
    dialect: 'mysql'
})
*/

module.exports = sequelize
