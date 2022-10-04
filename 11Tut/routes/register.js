const express = require('express');
const path = require('path');
const handleNewUser = require('../controllers/registerController')

const registerRoutes = express.Router();

registerRoutes.post('/', handleNewUser)

module.exports = registerRoutes;