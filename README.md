# musicPlayer
#API
## 属性
```
var audioObject = new Audio('http://xxx.com/xx.mp3')
```
- audioObject.play()开始播放
- audioObject.pause()暂停播放
- audioObject.autoPlay 设置或者获取自动播放状态
- audioObject.src 设置或者获取音乐地址
- audioObject.volume 设置或者获取音量，最大值为1，0为静音
- audioObject.loop 设置或者获取循环状态
- audioObject.duration 获取音乐长度，单位为秒
- audioObject.currentTime 设置或者获取播放时间
- audioObject.ended 判断音乐是否播放完毕，只读属性

## 事件
- playing 当音乐开始播放，暂停后重新开始播放，设置currentTime后开始播放时触发
- pause 当音乐暂停时和结束时触发
- ended 当音乐结束时触发
- timeupdate 当currentTime更新时会触发timeupdate事件,这个事件的触发频率由系统决定
- volumechange 当音量改变时触发
## 使用ajax获取数据
```
function getmusic(callback) {
	var xhr = new XMLHttpRequest()
	xhr.open("GET", "music.json", true)
	xhr.onload = function() {
		callback(JSON.parse(this.responseText)) //调用一个callback()处理响应回来的内容
		//...
	}
	xhr.send()
}
```
