const express = require('express');
const employeeApiRoutes = express.Router();

const {getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, singleEmployee } = require('../../controllers/employeesController')

employeeApiRoutes.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)
    
employeeApiRoutes.route('/:id')
    .get(singleEmployee)

module.exports = employeeApiRoutes;