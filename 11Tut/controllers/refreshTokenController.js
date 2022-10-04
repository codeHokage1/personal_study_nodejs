const usersDB = {
    users: require('../models/users.json'),
    setUsers (newUsers) {
        this.users = newUsers;
    }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) {
        return res.status(401).json({
            "message": "Cookie not found"
        })
    }
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) {
        res.status(403).json({
            "message": `User not found`
        })
    }

    // evaluate jwt; refresh token
    try {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {"username": decoded.username},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '60s'}
                )
                res.json({
                    "message": "Access token refreshed with the RefresnToken route",
                    "newAccessToken": accessToken
                })
            }

        )
       
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })
    }
}


module.exports = handleRefreshToken