// const fs = require('fs');
// const path = require('path');

// fs.readFile(path.join(__dirname, 'files', 'file2.txt'), 'utf8', (err, data) => {
//     if(err){
//         console.log(err.message);
//     }
//     console.log(data);
// })

// // fs.writeFile(path.join(__dirname, 'files', 'writeTo.txt'), "Hello, I am writing to you", err => {
// //     if(err){
// //         console.log(err.message);
// //     }    
// //     console.log('Sucessfully Written into file');
    
// // })

// fs.appendFile(path.join(__dirname, 'files', 'writeTo.txt'), "\nHello, I am writing to you for the second time", err => {
//     if(err){
//         console.log(err.message);
//     }    
//     console.log('Sucessfully appended into file');
    
// })




// ## Perfomring the operations synchrounously

const fsPromises = require('fs').promises
const path = require('path');

const fileOps = {
    async read () {
        try {
            const data = await fsPromises.readFile(path.join(__dirname, 'files', 'file2.txt'), 'utf8')
            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    },
    async write () {
        try {
            await fsPromises.writeFile(path.join(__dirname, 'files', 'writeTo.txt'), "Writig from promise functions")
            console.log("Written to file");
        } catch (error) {
            console.error(error.message);
        }    
    },
    async append () {
        try {
            await fsPromises.appendFile(path.join(__dirname, 'files', 'writeTo.txt'), "Appending from promise function")
            console.log("Appended to file");
        } catch (error) {
            console.error(error.message);
        }    
    }    
}

fileOps.read();
fileOps.write();