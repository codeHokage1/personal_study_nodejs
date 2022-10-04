const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
//define port
const PORT = 3007;

// Use middlewares
const {logger} = require('./middlewares/logEvents');
const verifyJWT = require('./middlewares/jwtVerify');

app.use(logger);
app.use(express.json())
app.use(cookieParser())

// server static files
app.use(express.static(path.join(__dirname, 'public')))

// import and use routers
const rootRoutes = require('./routes/root')
const employeeApiRoutes = require('./routes/api/employees')
const registerRoutes = require('./routes/register')
const loginRoutes = require('./routes/login')
const refreshTokenRoutes = require('./routes/refreshToken')
const logoutRoutes = require('./routes/logout')

app.use("/", rootRoutes)
app.use("/register", registerRoutes)
app.use("/login", loginRoutes)
app.use("/refresh", refreshTokenRoutes)
app.use("/logout", logoutRoutes)


app.use(verifyJWT)
app.use("/employees", employeeApiRoutes)



// set default response for a non-existing routes
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

// listen to port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))