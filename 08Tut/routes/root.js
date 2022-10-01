const express = require('express');
const path = require('path');

const rootRoutes = express.Router();

rootRoutes.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
})

rootRoutes.get('/new-page(.html)?|/new', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "new-page.html"))
})

rootRoutes.get('/old-page(.html)?|/new', (req, res) => {
    res.redirect(301, '/new')
})


module.exports = rootRoutes;