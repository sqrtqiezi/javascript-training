var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  // 主页
  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("Welcome to the homepage!");
  }

  // About页面
  else if (request.url == "/about") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("Welcome to the about page!");
  }

  // 404错误
  else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 error! File not found.");
  }
}).listen(9000);