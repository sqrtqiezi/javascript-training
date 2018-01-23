## Bookshelf

React 练手项目

### 预览地址
[http://qiezi.io/javascript-training/bookshelf/build/index.html](http://qiezi.io/javascript-training/bookshelf/build/index.html)

### 运行方式

`yarn && yarn start`

### 项目依赖

* fetch-jsonp 豆瓣 api 不开放个人注册，只好使用 jsonp 方式进行调用

### 数据存储
第一次访问页面，读取 [我的豆瓣阅读数据](https://book.douban.com/people/sqrtqiezi/)，然后存储在 LocalStorage 中，之后的所有操作结果都会存在 LocalStorage 中，并不同步到 douban 中（因为豆瓣 api 不开放个人注册）

### 设计稿
[dribbble](https://dribbble.com/shots/1222093-Bookshelf-e-books-UI/attachments/164086)