# 静态文件服务器

一个基于 node 的静态文件服务器。

## 依赖的包

* [shelljs](https://github.com/shelljs/shelljs)
* [markdown-js](https://github.com/evilstreak/markdown-js)

## 执行方式

依次运行如下命令：
* npm install
* npm start

## 渲染逻辑

* 访问目录，渲染文件列表
* 访问 html 和 markdown 文件，渲染为 HTML 页面
* 其它文件直接返回文本文件