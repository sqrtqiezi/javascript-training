## JavaScript 插件 - 标签页

### 组件功能
快速为页面添加动态的标签页功能

### 组件实现方式
CSS 控制组件展现样式，通过原生 JavaScript 捕获点击事件，修改标签元素的 class，以实现动态切换标签功能。

### 使用方式
```
//普通标签
var tab1 = new Tab(document.querySelectorAll('.tab-container')[0]);
//带动效显示的标签
var tab2 = new AnimateTab(document.querySelectorAll('.tab-container')[1]);
```