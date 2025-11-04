const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {

    const { name, email, password, rol } = req.body

    try {

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const userExist = await User.findOne({ where: { email } })
        if (userExist) return res.status(400).json({ message: 'El usuario ya existe' })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                rol
            })

        res.status(201).json({ message: 'Usuario registrado exitosamente', data: newUser })
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error: error });
    }
}

const login = async (req, res) => {
    
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ 
                status: 400, 
                message: 'Email y contraseña son requeridos' 
            });
        }        

        const userExist = await User.findOne({ where: { email } })
        if (!userExist) return res.status(401).json({ message: 'Usuario no encontrado' })

        const validPassword = await bcrypt.compare(password, userExist.password)
        if (!validPassword) return res.status(403).json({ message: 'Contraseña incorrecta' })

        const user = {
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            rol: userExist.rol,
            is_active: userExist.is_active
        }

        const token = jwt.sign({ user: user }, 'secreto1234', { expiresIn: '1h' })


        res.json({ message: 'Inicio de sesion exitoso', token })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al loguear el usuario', error: error.message });
    }
}

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const usuarios = await User.findAll();
        res.json({ status: 200, data: usuarios });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener usuarios', error: error.message });
    }
};

// Obtener usuario por ID con datos de empleado y horarios
const getProfile = async (req, res) => {
    try {
        const userId = req.user.user.id; // Accedemos a user.user porque así está estructurado el token
        
        // Importamos los modelos necesarios
        const { Employee, Schedule } = require('../models');
        
        const usuario = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'rol', 'is_active'], // Excluimos el password por seguridad
            include: [
                {
                    model: Employee,
                    as: 'employees', // User hasMany employees
                    required: false, // LEFT JOIN para que funcione aunque no tenga empleado
                    attributes: ['id', 'position', 'hiringDate', 'status'],
                    include: [
                        {
                            model: Schedule,
                            as: 'schedules', // Employee hasMany schedules
                            required: false,
                            attributes: ['id', 'date', 'startTime', 'endTime']
                        }
                    ]
                }
            ]
        });
        
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.json({ status: 200, data: usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
};


// Editar usuario
const updateUser = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
        }

        const { name, email, password, rol, is_active } = req.body;
        usuario.name = name || usuario.name;
        usuario.email = email || usuario.email;
        usuario.password = password || usuario.password;
        usuario.rol = rol || usuario.rol;
        // Usar una verificación explícita para is_active
        usuario.is_active = is_active === undefined ? usuario.is_active : is_active;

        await usuario.save();

        res.status(200).json({ status: 200, message: 'Usuario editado exitosamente', data: usuario });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al editar usuario', error: error.message });
    }
};

module.exports = {
    getUsers,
    updateUser,
    register,
    login,
    getProfile
};
