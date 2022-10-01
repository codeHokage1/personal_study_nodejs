const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');
const PORT = 3007;

const {logger} = require('./middlewares/logEvents');

// use CORS: Accessible from anywhere and by any domain
// app.use(cors());


// use CORS: Accessible from only a list of domains
const whiteList = ['https://www.google.com', 'http://localhost:3009'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error('Domain can not access server'))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))


// custom middleware
app.use(logger);


// Built-in middleqare
app.use(express.static(path.join(__dirname, 'public')))

const one = (req, res, next) => {
    console.log('First middlewares');
    next()
}

const two = (req, res) => {
    console.log('second middlewares');
    res.send("Done with Chaining")
}

app.get('/chain', [one, two])


app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile(path.join(__dirname, "views", "index.html"))
    //or
    res.sendFile("./views/index.html", {root: __dirname})
})

app.get('/new-page(.html)?|/new', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"))
})

app.get('/old-page(.html)?|/new', (req, res) => {
    res.redirect(301, '/new')
})

app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))