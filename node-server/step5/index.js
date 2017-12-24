'use strict'

var http = require('http')
var fs = require('fs')
var shell = require('shelljs')
var markdown = require('markdown').markdown

function handleDIR(response, realPath, url) {
  var result = ['<ul>']
  shell.ls(realPath).forEach(function (file) {
    result.push(`<li><a href="${url === "/" ? '' : url}/${file}">${file}</a></li>`)
  })
  result.push('</ul>')
  response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
  response.end(result.join(''))
}

function handleFile(response, realPath) {
  if (realPath.endsWith('.html')) {
    handleHTML(response, realPath)
  } else if (realPath.endsWith('.md')) {
    handleMarkdown(response, realPath)
  } else {
    handleText(response, realPath)
  }
}

function handleHTML(response, realPath) {
  fs.readFile(realPath, function (err, data) {
    response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
    response.end(data)
  })
}

function handleMarkdown(response, realPath) {
  fs.readFile(realPath, 'UTF-8', function(err, data) {
    var temp = realPath.split('/')
    response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"})
    response.end(`
        <!DOCTYPE html>
        <html lang="zh-cn">
        <head>
          <meta charset="UTF-8">
          <title>${temp[temp.length - 1]}</title>
        </head>
        <body>
          ${markdown.toHTML(data)}
        </body>
        </html>`)
  })
}

function handleText(response, realPath) {
  fs.readFile(realPath, function (err, data) {
    response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
    response.end(data)
  })
}

function failed(response, result) {
  response.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"})
  response.end(result)
}

function routePath(request, response) {
  var realPath = `${__dirname}${request.url}`, result
  
  console.log(realPath)
  if (!shell.test('-e', realPath)) {
    failed(response, '没有找到此文件！')
  }
  else if (shell.test('-d', realPath)) {
    handleDIR(response, realPath, request.url)
  } else if (shell.test('-f', realPath)) {
    handleFile(response, realPath, request.url)
  } else {
    failed(response, '无效的文件类型！')
  }
}

http.createServer(function (request, response) {
  routePath(request, response)
}).listen(9000, function() {
  console.log('server started')
})