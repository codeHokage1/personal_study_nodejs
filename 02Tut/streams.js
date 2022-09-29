const fs = require('fs');

const rs = fs.createReadStream('./files/file2.txt', {encoding: 'utf8'});
const ws = fs.createWriteStream('./files/writeTo.txt');

rs.on('data', data => {
    ws.write(data)
})