const express = require('express');
const path = require('path');

const subRoutes = express.Router();

subRoutes.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"))
})

subRoutes.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"))
})



module.exports = subRoutes;