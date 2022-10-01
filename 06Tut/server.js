const express = require('express');
const app = express();

const path = require('path');
const PORT = 3007;

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