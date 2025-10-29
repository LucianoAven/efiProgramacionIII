const express = require('express');
const router = express.Router();
const {
    getUsers,
    updateUser,
    register,
    login,
    getProfile
} = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

// Rutas públicas de autenticación
router.post('/register', register);
router.post('/login', login);

// Ruta protegida para el perfil
router.get('/profile', verifyToken, getProfile);

// Rutas administrativas (requieren token y rol de admin)
router.get('/', verifyToken, isAdmin, getUsers);
router.put('/:id', verifyToken, isAdmin, updateUser);

module.exports = router;
