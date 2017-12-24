var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  fs.readFile('template.html', function readData (err, data) {
    response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});
    response.end(data);
  })

  // fs.createReadStream(`${__dirname}/template.html`).pipe(response);
}).listen(9000);