const { Employee, User } = require('../models')
const { Op } = require('sequelize')


const getEmployees = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1)
        const limit = Math.max(1, parseInt(req.query.limit, 10) || 10)
        const q = (req.query.q || '').trim()
        const offset = (page - 1) * limit

        // Configurar el filtro de búsqueda
        const includeUser = {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
            required: false
        }

        // Si hay búsqueda, filtrar por nombre de usuario
        if (q) {
            includeUser.where = {
                name: { [Op.like]: `${q}%` }
            }
            includeUser.required = true
        }

        const { rows: empleados, count } = await Employee.findAndCountAll({
            attributes: ['id', 'position', 'hiringDate', 'status'],
            include: [includeUser],
            offset,
            limit,
            order: [['id', 'DESC']]
        })
        
        return res.json({ 
            data: empleados, 
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
            status: 200,
            message: 'Empleados obtenidos de manera exitosa',
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener empleados' })
    }
}

const getEmployeeById = async (req, res) => {
    try {

        const employee = await Employee.findByPk(req.params.id, {
            include: [Usuario]
        })

        if (!employee) {
            return res.status(404).json({ message: 'Empleado no encontrado' })
        }
        res.json({ data: employee, status: 200, message: 'Empleado encontrado' })
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el empleado', error: error })
    }
}

const createEmployee = async (req, res) => {
    const { position, hiringDate, status, userId } = req.body
    try {
        if (!position || !hiringDate || !userId) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' })
        }
        const nuevoEmpleado = await Employee.create({ 
            position, 
            hiringDate, 
            status: status !== undefined ? status : true, 
            userId 
        })
        res.json({ status: 201, data: nuevoEmpleado, message: 'Empleado creado exitosamente' })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear el empleado', error: error })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        const { position, hiringDate, status, userId } = req.body;

        if (position) employee.position = position;
        if (hiringDate) employee.hiringDate = hiringDate;
        if (status !== undefined) employee.status = status;
        if (userId) employee.userId = userId;

        await employee.save();

        res.json({ status: 201, message: 'Empleado editado exitosamente', data: employee });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar empleado', error: error });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        await employee.destroy();

        res.json({ status: 201, message: 'Empleado eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar empleado', error: error });
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
}