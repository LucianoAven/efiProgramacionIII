const express = require('express')
const router = express.Router()
const { forgotPassword, resetPassword } = require('../controllers/auth.controller')

router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)


module.exports = router