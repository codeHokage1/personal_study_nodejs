const usersDB = {
    users: require('../models/users.json'),
    setUsers (newUsers) {
        this.users = newUsers;
    }
}

const fsPromises = require('fs').promises
const path = require('path');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.status(400).json({
            "message": "Username and password are required"
        })
    }
    const foundUser = usersDB.users.find(person => person.username === username);
    if(!foundUser) {
        res.status(401).json({
            "message": `User ${username} not found`
        })
    }
    try {
        const passwordMatch = bcrypt.compare(password, foundUser.password);
        if(passwordMatch){
            res.json({
                "message": `User ${username} is logged in!`
            })
        } else {
            res.status(401).json({
                "message": "Password doesn't match with record"
            })
        }
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })
    }
}


module.exports = handleLogin