require('dotenv').config()

console.log("Variables de entorno:", process.env.DB_HOST, process.env.DB_USER, process.env.DB_NAME);

const sequelize = require('./db/db');

// FORZAR creación de tablas en producción (temporal)
sequelize.sync({ force: true, alter: true })
  .then(() => console.log("✅ Tablas creadas correctamente"))
  .catch(err => console.error("❌ Error creando tablas:", err));

const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3000;
/* const port = 3000 */

app.use(cors())
app.use(express.json())

const empleadosRouter = require('./routes/employees.routes')
const usuariosRouter = require('./routes/users.routes');
const horariosRouter = require('./routes/schedules.routes')
const solicitudesHorariosRouter = require('./routes/schedule_requests.routes')
const authRouter = require('./routes/auth.routes')

app.use('/empleados', empleadosRouter)
app.use('/usuarios', usuariosRouter)
app.use('/horarios', horariosRouter)
app.use('/solicitudes-horarios', solicitudesHorariosRouter)
app.use('/auth', authRouter)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

/*
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a la base de datos establecida correctamente.'))
  .catch(err => console.error('❌ Error al conectar con la base de datos:', err));

app.listen(port, () => {
    console.log(`servidor corriendo en localhost:${port}`)
})  
*/


sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // 🔽 Esto crea las tablas automáticamente si no existen
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Tablas sincronizadas correctamente.');
  })
  .catch(err => {
    console.error('❌ Error al conectar con la base de datos o sincronizar:', err);
  });



