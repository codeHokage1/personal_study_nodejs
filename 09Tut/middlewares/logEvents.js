const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const {v4: uuid} = require('uuid');

const logEvents = async (message) => {
    const logItem = `\n${new Date()} \n${uuid()}: \t${message}\n`
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'logs.txt'), logItem);
    } catch (error) {
        console.log(error.message);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`)
    console.log(`Method: ${req.method} \t Path: ${req.url}`);
    next();
}

module.exports = {logEvents, logger};

