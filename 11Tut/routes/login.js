const express = require('express');
const handleLogin = require('../controllers/authController')
const loginRoutes = express.Router();

loginRoutes.post('/', handleLogin)

module.exports = loginRoutes;