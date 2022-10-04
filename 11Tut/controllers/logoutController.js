const usersDB = {
    users: require('../models/users.json'),
    setUsers (newUsers) {
        this.users = newUsers;
    }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) {
        return res.status(204).json({
            "message": "No content. Cookie not found"
        })
    }
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true})
        res.status(204).json({
            "message": `User not found. But Cookie cleared!`
        })
    }

    // evaluate jwt; refresh token
    try {
        const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
        const currentUser =  {...foundUser, refreshToken: ""};
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'models', "users.json"), JSON.stringify(usersDB.users))
        res.clearCookie('jwt', {httpOnly: true})
        res.status(204).json({
            "message": `User ${foundUser.username} logged out! And cookies cleared!`
        })
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })
    }
}


module.exports = handleLogout