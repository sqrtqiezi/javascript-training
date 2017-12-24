var http = require("http")

var server = http.createServer(function(req, res){
  res.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
  res.write("<html><body><h1>我的心愿是世界和平</h1></body></html>")
  res.end()
}).listen(9000)