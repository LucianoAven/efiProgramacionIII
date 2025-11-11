require('dotenv').config()

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
app.listen(port, () => {
    console.log(`servidor corriendo en localhost:${port}`)
})  
*/