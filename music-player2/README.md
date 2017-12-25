音乐播放器(HTML5 Audio API)
---------

# 预览地址
[Music Player](http://qiezi.io/javascript-training/music-player2/index.html)

# 执行方式
依次执行以下命令：

* npm install
* npm start

## API
### 属性
#### 1. audioObject
 创建或者获取的audio对象，可通过以下两种方式得到

**方法1:**
```html
<audio id="music" src="http://cloud.hunger-valley.com/music/玫瑰.mp3">你的浏览器不支持喔！</audio>
<script>
var audioObject = document.querySelector('#music')
</script>
```

**方法2**
```javascript
var audioObject = new Audio('http://cloud.hunger-valley.com/music/玫瑰.mp3')
```

#### 2. audioObject.play()
开始播放

#### 3. audioObject.pause()
暂停播放

#### 4. audioObject.autoPlay
设置或者获取自动播放状态

```javascript
audioObject.autoPlay = true  //设置为自动播放，下次更换 audioObject.src 后会自动播放音乐
audioObject.autoPlay = false //设置不自动播放
console.log(audioObject.autoPlay)
```

#### 5.audioObject.src
设置或者获取音乐地址

```javascript
audioObject.src = "http://cloud.hunger-valley.com/music/ifyou.mp3"
console.log(audioObject.src)
```
#### 6. audioObject.volume
设置或者获取音量，最大值为1，0为静音

```javascript
audioObject.volume = 0.5
audioObject.volume = 1
console.log(audioObject.volume)
```
#### 7. audioObject.loop
设置或者获取循环状态

```javascript
audioObject.loop = true
console.log(audioObject.loop)
```

#### 8. audioObject.duration
获取音乐长度，单位为秒

```javascript
console.log(audioObject.duration)
```

#### 9. audioObject.currentTime
设置或者获取播放时间

```javascript
console.log(audioObject.currentTime)
```
#### 10. audioObject.ended
判断音乐是否播放完毕，只读属性

### 事件
#### 1. `playing`
当音乐开始播放，暂停后重新开始播放，设置currentTime后开始播放时触发

```javascript
audioObject.addEventListener('playing', function(){
  console.log('playing')
})
```

#### 2. `pause`
当音乐暂停时和结束时触发

```javascript
audioObject.addEventListener('pause', function(){
  console.log('pause')
})
```
#### 3. `ended`
当音乐结束时触发

```javascript
audioObject.addEventListener('ended', function(){
  console.log('ended')
})
```
#### 3. `timeupdate `
当currentTime更新时会触发timeupdate事件,这个事件的触发频率由系统决定，但是会保证每秒触发4-66次（前提是每次事件处理不会超过250ms.

```javascript

//如下代码设置 每1秒左右执行一次
audioObject.shouldUpdate = true
audioObject.ontimeupdate = function(){
  var _this = this
  if(_this.shouldUpdate) {
     //do something
     console.log('update')
     _this.shouldUpdate = false
    setTimeout(function(){
      _this.shouldUpdate = true
    }, 1000)
  }
}
```
#### 4. `volumechange`
当音量改变时触发

```javascript
audioObject.onvolumechange = function(){
  console.log('volumechange')
}
```

## 参考资料
- [MDN-HTMLMediaElement](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement)
- [MDN-Media_events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events)


# 设计稿
[dribbble](https://dribbble.com/shots/903611-Mini-player)
