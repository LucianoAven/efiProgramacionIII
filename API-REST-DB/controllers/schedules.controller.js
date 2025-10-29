const { Schedule, Employee, User } = require('../models')
const { Op } = require('sequelize')

const getSchedules = async (req, res) => {
    try {
        const { employeeName, date } = req.query;

        // Configurar filtros
        const whereConditions = {};
        const includeUser = {
            model: Employee,
            as: 'employee',
            attributes: ['id', 'userId', 'position'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                }
            ]
        };

        // Filtro por fecha
        if (date) {
            whereConditions.date = date;
        }

        // Filtro por nombre de empleado
        if (employeeName) {
            includeUser.include[0].where = {
                name: { [Op.like]: `${employeeName}%` }
            };
            includeUser.include[0].required = true; // Excluir empleados sin usuario que coincida
        }

        const schedules = await Schedule.findAll({
            where: whereConditions,
            attributes: ['id', 'employeeId', 'date', 'startTime', 'endTime'],
            include: [includeUser],
            order: [['date', 'DESC'], ['startTime', 'ASC']]
        })
        res.json({ data: schedules, status: 200, message: 'Horarios obtenidos de manera exitosa' })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener horarios', error: error })
    }
}

const getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findByPk(req.params.id, {
            include: [
                {
                    model: Employee,
                    as: 'employee',
                    attributes: ['id', 'userId', 'position'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name', 'email']
                        }
                    ]
                }
            ]
        })

        if (!schedule) {
            return res.status(404).json({ message: 'Horario no encontrado' })
        }
        res.json({ data: schedule, status: 200, message: 'Horario encontrado' })
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el horario', error: error })
    }
}

const createSchedule = async (req, res) => {
    const { employeeId, date, startTime, endTime } = req.body
    try {
        if (!employeeId || !date || !startTime || !endTime) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' })
        }
        const nuevoHorario = await Schedule.create({ employeeId, date, startTime, endTime })

        // Buscar el horario con toda la información del empleado
        const horarioCompleto = await Schedule.findByPk(nuevoHorario.id, {
            include: [
                {
                    model: Employee,
                    as: 'employee',
                    attributes: ['id', 'userId', 'position'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name', 'email']
                        }
                    ]
                }
            ]
        })

        res.json({ status: 201, data: horarioCompleto, message: 'Horario creado exitosamente' })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear el horario', error: error })
    }
}

const updateSchedule = async (req, res) => {
    try {
        const horario = await Schedule.findByPk(req.params.id);
        if (!horario) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }

        const { employeeId, date, startTime, endTime } = req.body;

        horario.employeeId = employeeId || horario.employeeId;
        horario.date = date || horario.date;
        horario.startTime = startTime || horario.startTime;
        horario.endTime = endTime || horario.endTime;

        await horario.save();

        // Buscar el horario actualizado con toda la información del empleado
        const horarioCompleto = await Schedule.findByPk(horario.id, {
            include: [
                {
                    model: Employee,
                    as: 'employee',
                    attributes: ['id', 'userId', 'position'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name', 'email']
                        }
                    ]
                }
            ]
        });        

        res.status(201).json({ data: horarioCompleto, message: 'Horario editado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error, message: 'Error al editar horario' });
    }
};


const deleteSchedule = async (req, res) => {
    try {
        const horario = await Schedule.findByPk(req.params.id);
        if (!horario) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }

        await horario.destroy();

        res.status(201).json({ message: 'Horario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar horario', error: error });
    }
};


module.exports = {
    getSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
}