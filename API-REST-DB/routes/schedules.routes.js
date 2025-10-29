const express = require('express');
const router = express.Router();
const {
    getSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
} = require('../controllers/schedules.controller');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', verifyToken, isAdmin, getSchedules);
router.get('/:id', verifyToken, isAdmin, getScheduleById);
router.post('/', verifyToken, isAdmin, createSchedule);
router.put('/:id', verifyToken, isAdmin, updateSchedule);
router.delete('/:id', verifyToken, isAdmin, deleteSchedule);

module.exports = router;
