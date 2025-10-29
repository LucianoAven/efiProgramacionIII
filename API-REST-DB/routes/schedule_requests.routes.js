const express = require('express');
const router = express.Router();
const {
    getScheduleRequests,
    getMyScheduleRequests,
    getScheduleRequestById,
    createScheduleRequest,
    updateScheduleRequest,
} = require('../controllers/schedule_requests.controller');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', verifyToken, isAdmin, getScheduleRequests);
router.get('/mis-solicitudes', verifyToken, getMyScheduleRequests);
router.get('/:id', verifyToken, getScheduleRequestById);
router.post('/', verifyToken, createScheduleRequest);
router.put('/:id', verifyToken, isAdmin, updateScheduleRequest);

module.exports = router;
