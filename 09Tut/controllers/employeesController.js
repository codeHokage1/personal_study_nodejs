const data = {
    employees: require('../models/employeesData.json'),
    setEmployees (newArray) {
        this.employees = newArray;
    }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    if(!req.body.firstname || !req.body.lastname){
        return res.status(400).json({
            "message": "First and last name are required"
        })
    } 

    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        ...req.body
    }
    data.setEmployees([...data.employees, newEmployee])
    res.status(201).json({
        "message": "Successfully added employee",
        "newEmployee": newEmployee
    })
}

const updateEmployee = (req, res) => {
    const id = Number(req.body.id);
    let foundEmployee = data.employees.find(emp => emp.id === id);
    if (!foundEmployee) {
        return res.status(404).json({
            "message": `Employee with id ${id} not found`
        })
    }
    foundEmployee = {...req.body}
    const newArray = data.employees.filter(emp => emp.id !== id);
    data.setEmployees([...newArray, foundEmployee])
    res.status(201).json({
        "message": "Successfully updated employee",
        "newEmployee": foundEmployee
    })
}

const deleteEmployee = (req, res) => {
    const id = Number(req.body.id);
    let foundEmployee = data.employees.find(emp => emp.id === id);
    if (!foundEmployee) {
        return res.status(404).json({
            "message": `Employee with id ${id} not found`
        })
    }
    const newArray = data.employees.filter(emp => emp.id !== id);
    data.setEmployees(newArray);
    res.status(300).json({
        "message": `Deleted employee with id ${id}`
    })
}

const singleEmployee = (req, res) => {
    const id = Number(req.params.id);
    let foundEmployee = data.employees.find(emp => emp.id === id);
    if (!foundEmployee) {
        return res.status(404).json({
            "message": `Employee with id ${id} not found`
        })
    }
    res.json(foundEmployee);
}

module.exports = {
    getAllEmployees, 
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    singleEmployee
}