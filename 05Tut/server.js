const fs = require('fs');
const path = require('path')
const http = require('http')

const PORT = process.env.PORT || 3008;

const server = http.createServer((req, res) => {
    if(req.url === '/' || req.url === '/home'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, data) => {
            if(err){
                return res.end("Error retrieving file content");
            }
            res.end(data);
        })
    } else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        fs.readFile(path.join(__dirname, 'views', '404.html'), (err, data) => {
            if(err){
                return res.end("Error retrieving file content");
            }
            res.end(data);
        })
    }
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})