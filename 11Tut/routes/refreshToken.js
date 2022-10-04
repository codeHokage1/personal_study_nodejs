const express = require('express');
const handleRefreshToken = require('../controllers/refreshTokenController');
const refreshTokenRoutes = express.Router();

refreshTokenRoutes.get('/', handleRefreshToken)

module.exports = refreshTokenRoutes;