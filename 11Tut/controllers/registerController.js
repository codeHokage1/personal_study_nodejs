const usersDB = {
    users: require('../models/users.json'),
    setUsers (newUsers) {
        this.users = newUsers;
    }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async ( req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.status(400).json({
            "message": "Username and password are required"
        })
    }
    if(usersDB.users.find(person => person.username === username)){
        return res.status(409).json({
            "message": "Username already exist"
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
            username: username,
            password: hashedPassword
        }    
        usersDB.setUsers([...usersDB.users, newUser]) 
        await fsPromises.writeFile(
            path.join(__dirname, "..", "models", "users.json"),
            JSON.stringify(usersDB.users)
        )   
        res.status(201).json({
            "success": true,
            "message": `User ${newUser.username} created`
        })
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })        
    }
}

module.exports = handleNewUser