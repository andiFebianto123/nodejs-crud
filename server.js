const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // console.log('request made');
    res.setHeader('Content-type', 'text/html');

    let path = './views';

    switch(req.url){
        case '/':
            path += '/home.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        case '/about-you':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            res.statusCode = 404;
            path += '/404.html';
    }

    fs.readFile(path, (err, data) => {
        if(err){
            console.log('not read html file');
            res.end();
        }else{
            res.end(data);
        }
    });

})

server.listen(3000, 'localhost', () => {
    console.log('listening for request port 3000');
});