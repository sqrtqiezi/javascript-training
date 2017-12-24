var http = require('http')
var fs = require('fs')
var Mock = require('mockjs')
var markdown = require('markdown').markdown


function responseJSON(response, obj) {
  response.writeHead(200, {"Content-Type": "application/json; charset=UTF-8"})
  response.end(JSON.stringify(obj))
}

var TEMPLATE_USER = {
  'id': '@integer(10, 100)',
  'username': '@string("lower", 10)',
  'email': /^[a-z0-9]+([._\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,2}[a-z0-9]+$/,
  'phone_number': /^1(3[0-9]|4[579]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/
}
var TEMPLATE_BOOK = {
  'id': '@integer(10, 100)',
  'name': '@string("lower", 10)',
  'price': '@float(10, 100, 0, 2)',
  'published_at': '@date("yyyy-MM-dd")',
  'isbn': '@integer(10000, 99999)'
}

http.createServer(function (request, response) {
    // 主页: 直接渲染 README.md
    if (request.url === "/") {
      fs.readFile('README.md', 'UTF-8', function readData (err, data) {
        response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
        response.end(`
        <!DOCTYPE html>
        <html lang="zh-cn">
        <head>
          <meta charset="UTF-8">
          <title>文档</title>
        </head>
        <body>
          ${markdown.toHTML(data)}
        </body>
        </html>`)
      })
    }

    else if (request.url === "/user") {
      responseJSON(response, {
        'data': Mock.mock(TEMPLATE_USER)
      })
    }

    else if (request.url.match(/^\/book\/\d*/)) {
      responseJSON(response, {
        'data': Mock.mock(TEMPLATE_BOOK)
      })
    }

    else if (request.url === '/books') {
      responseJSON(response, {
        'data': Mock.mock({
          'books|5-10': [TEMPLATE_BOOK]
        })
      })
    }

    // 404错误
    else {
      var result = '404 error! File not found.'
      var header = {"Content-Type": "text/plain; charset=UTF-8"}
      if (request.headers.accept.indexOf('application/json') !== -1) {
        header = {"Content-Type": "application/json; charset=UTF-8"}
        result = {
          message: result
        }
      }
      response.writeHead(404, header)
      response.end(result)
    }
}).listen(9000, function (){
  console.log("server started")
})