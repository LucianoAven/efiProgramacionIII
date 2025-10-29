const express = require('express')
const router = express.Router()
const {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employees.controller')
const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', verifyToken, isAdmin, getEmployees)
router.get('/:id', verifyToken, getEmployeeById)
router.post('/', verifyToken, isAdmin, createEmployee)
router.put('/:id', verifyToken, isAdmin, updateEmployee)
router.delete('/:id', verifyToken, isAdmin, deleteEmployee)

module.exports = router