const os = require('os');
const path = require('path');

console.log(os.type());
console.log(os.version());

console.log(__dirname);
console.log(__filename);

console.log(path.parse(__filename));
console.log(path.extname(__filename));




