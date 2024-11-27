var http = require('http');

const express=express();
const app=express();

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  myDateTime = function () {
    return Date();
  };
  res.write('Hello World!'+ myDateTime());
  
}).listen(8080);