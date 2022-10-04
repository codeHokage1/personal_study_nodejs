const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

//define port
const PORT = 3007;

// Use middlewares
const {logger} = require('./middlewares/logEvents');
app.use(logger);
app.use(express.json())

// server static files
app.use(express.static(path.join(__dirname, 'public')))

// import and use routers
const rootRoutes = require('./routes/root')
const employeeApiRoutes = require('./routes/api/employees')
const registerRoutes = require('./routes/register')
const loginRoutes = require('./routes/login')

app.use("/", rootRoutes)
app.use("/employees", employeeApiRoutes)
app.use("/register", registerRoutes)
app.use("/login", loginRoutes)


// set default response for a non-existing routes
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

// listen to port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))