const { ScheduleRequest, Employee, User } = require('../models')

const getScheduleRequests = async (req, res) => {
    try {
        const scheduleRequests = await ScheduleRequest.findAll({
            attributes: ['id', 'employeeId', 'requestDate', 'startTime', 'endTime', 'status'],
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
                },
            ]            
        })
        res.json({ data: scheduleRequests, status: 200, message: 'Solicitudes de horario obtenidas de manera exitosa' })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener solicitudes de horarios', error: error })
    }
}

const getMyScheduleRequests = async (req, res) => {
    try {
        // Obtener el userId del token
        const userId = req.user.user.id;
        
        // Buscar primero el empleado correspondiente al usuario
        const employee = await Employee.findOne({
            where: { userId: userId }
        });
        
        if (!employee) {
            return res.status(404).json({ message: 'No se encontró información de empleado para este usuario' });
        }
        
        // Buscar las solicitudes del empleado
        const scheduleRequests = await ScheduleRequest.findAll({
            where: { employeeId: employee.id },
            attributes: ['id', 'employeeId', 'requestDate', 'startTime', 'endTime', 'status'],
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
                },
            ]            
        });
        
        res.json({ data: scheduleRequests, status: 200, message: 'Mis solicitudes de horario obtenidas exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener mis solicitudes de horarios', error: error });
    }
}

const getScheduleRequestById = async (req, res) => {
    try {

        const scheduleRequest = await ScheduleRequest.findByPk(req.params.id, {
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

        if (!scheduleRequest) {
            return res.status(404).json({ message: 'Solicitud de horario no encontrada' })
        }
        res.json({ data: scheduleRequest, status: 200, message: 'Solicitud de horario encontrada' })
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar la solicitud de horario', error: error })
    }
}

const createScheduleRequest = async (req, res) => {
    const { employeeId, requestDate, startTime, endTime } = req.body
    try {
        if (!employeeId || !requestDate || !startTime || !endTime) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' })
        }
        const nuevaSolicitud = await ScheduleRequest.create({ 
            employeeId, 
            requestDate, 
            startTime, 
            endTime, 
            status: 'pendiente'
        })
        
        // Buscar la solicitud creada con toda la información del empleado
        const solicitudCompleta = await ScheduleRequest.findByPk(nuevaSolicitud.id, {
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
        
        res.json({ status: 201, data: solicitudCompleta, message: 'Solicitud de horario creada exitosamente' })

        console.log('Nueva solicitud de horario creada:', solicitudCompleta);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear la solicitud de horario', error: error })
    }
}

const updateScheduleRequest = async (req, res) => {
    try {
        const scheduleRequest = await ScheduleRequest.findByPk(req.params.id);
        if (!scheduleRequest) {
            return res.status(404).json({ message: 'Solicitud de horario no encontrada' });
        }

        const { employeeId, requestDate, startTime, endTime, status } = req.body;

        scheduleRequest.employeeId = employeeId || scheduleRequest.employeeId;
        scheduleRequest.requestDate = requestDate || scheduleRequest.requestDate;
        scheduleRequest.startTime = startTime || scheduleRequest.startTime;
        scheduleRequest.endTime = endTime || scheduleRequest.endTime;
        scheduleRequest.status = status !== undefined ? status : scheduleRequest.status;

        await scheduleRequest.save();

        // Buscar la solicitud actualizada con toda la información del empleado
        const solicitudCompleta = await ScheduleRequest.findByPk(scheduleRequest.id, {
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

        res.status(200).json({ message: 'Solicitud de horario editada exitosamente', data: solicitudCompleta });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar solicitud de horario', error: error });
    }
};

module.exports = {
    getScheduleRequests,
    getMyScheduleRequests,
    getScheduleRequestById,
    createScheduleRequest,
    updateScheduleRequest,
};