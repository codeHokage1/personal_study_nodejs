const express = require('express');
const handleLogout = require('../controllers/logoutController')
const logoutRoutes = express.Router();

logoutRoutes.get('/', handleLogout)

module.exports = logoutRoutes;