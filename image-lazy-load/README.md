## Unsplash 图片墙 - 木桶布局

### 预览地址
[http://qiezi.io/javascript-training/image-lazy-load/](http://qiezi.io/javascript-training/image-lazy-load/)

### 木桶布局原理

1. 计算木桶布局容器的宽度；
2. 取出一个木桶布局元素，设置其高度为基准行高：heightBase，并计算出其宽度；
3. 计算木桶容器最后一行的宽度，如果：
  * 最后一行宽度 + 元素宽度 < 容器宽度：直接将当前元素放入容器之中
  * 最后一行宽度 + 元素宽度 > 容器宽度：拉伸当前最后一行的宽度为容器宽度，并等比例缩放行高。然后将当前操作元素放入容器之中，作为新的一行
4. 重复步骤 2-3 ，直到所有元素都被处理完成
