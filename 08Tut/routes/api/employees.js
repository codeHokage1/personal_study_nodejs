const express = require('express');
const data = require('../../data/employeesData.json');

const employeeApiRoutes = express.Router();

employeeApiRoutes.route('/')
    .get((req, res) => {
        res.json(data);
    })
    .post((req, res) => {
        res.json({
            "newEmployee": req.body
        })
    })
    .put((req, res) => {
        res.json({
            "updatedEmployee": req.body
        })
    })
    
employeeApiRoutes.route('/:id')
    .get((req, res) => {
        res.json({
            "id": req.params.id
        })
    })

module.exports = employeeApiRoutes;