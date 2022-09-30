const logEvents = require('./logEvents');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

myEmitter.on('log', (message) => logEvents(message));

let count = 0;
while(count < 5){
    myEmitter.emit('log', `Hello there! ${count}`);
    count++;
}