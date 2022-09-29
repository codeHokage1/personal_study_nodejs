const os = require('os');
const path = require('path');
const {add, sub, product} = require('./myModule');

console.log(os.type());
console.log(os.version());

console.log(__dirname);
console.log(__filename);

console.log(path.parse(__filename));
console.log(path.extname(__filename));

console.log(add(3, 5));
console.log(sub(3, 5));
console.log(product(3, 5));





