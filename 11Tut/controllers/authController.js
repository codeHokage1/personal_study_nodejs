const usersDB = {
    users: require('../models/users.json'),
    setUsers (newUsers) {
        this.users = newUsers;
    }
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');


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
            // ## Create a JWT

            // 1. Define the access and refresh tokens
            const accessToken = jwt.sign(
                {"username": foundUser.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '60s'}
            );
            const refreshToken = jwt.sign(
                {"username": foundUser.username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            );
            
            // 2. Save the refresh token together with the current user
            const otherUsers = usersDB.users.filter(user => user.username !== foundUser.username);
            const currentUser = {...foundUser, refreshToken};
            usersDB.setUsers([...otherUsers, currentUser]);
            await fsPromises.writeFile(path.join(__dirname, "..", "models", "users.json"), JSON.stringify(usersDB.users));
            
            // 3. Return the access token as JSON and refresh token as httpOnly cookie
            res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 3600000});
            res.json({
                "message": `User ${username} is logged in!`,
                'accessToken': accessToken
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