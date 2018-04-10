var musicList=[]
var currentIndex=0
var audio=new Audio()
audio.autoplay=true

getmusic(function(list){
	musicList=list
	loadMusic(list[currentIndex])
})
audio.ontimeupdate=function(){
	$('.musicbox .progress-now').style.width=(this.currentTime/this.duration)*100+'%'
}
audio.onplay=function(){
	clock=setInterval(function(){
		var min=Math.floor(audio.currentTime/60)
		var sec=Math.floor(audio.currentTime%60)+''
		sec=sec.length==2?sec:'0'+sec
		$('.musicbox .time').innerText=min+':'+sec
	},1000)
}
audio.onended=function(){
	console.log('end')
	currentIndex=(++currentIndex)%musicList.length
	loadMusic(musicList[currentIndex])
}
audio.onpause=function(){
	clearInterval(clock)
}

$('.musicbox .play').onclick=function(){
	playSwitch()
}	
$('.musicbox .forward').onclick=function(){
	currentIndex = (++currentIndex)%musicList.length
	console.log(currentIndex)
	loadMusic(musicList[currentIndex])
	playSwitch()
}
$('.musicbox .back').onclick=function(){
	currentIndex=(musicList.length+(--currentIndex))%musicList.length
	console.log(currentIndex)
	loadMusic(musicList[currentIndex])
	playSwitch()
}
$('.musicbox .bar').onclick=function(e){
	var barWidth=e.offsetX/parseInt(getComputedStyle(this).width)
	console.log(barWidth)
	audio.currentTime=audio.duration*barWidth
}
function $(selector){
	return document.querySelector(selector)
}
function playSwitch(){
	if(audio.paused){//播放中为false
		$('.musicbox .play').querySelector('.fa').classList.remove('fa-play')
		$('.musicbox .play').querySelector('.fa').classList.add('fa-pause')
		audio.play()
	}else{
		$('.musicbox .play').querySelector('.fa').classList.remove('fa-pause')
		$('.musicbox .play').querySelector('.fa').classList.add('fa-play')
		
		audio.pause()
	}
}
function getmusic(callback) {
	var xhr = new XMLHttpRequest()
	xhr.open("GET", "music.json", true)
	xhr.onload = function() {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
			callback(JSON.parse(this.responseText))
		} else {
			document.write("<h1 style='text-align:center'>获取数据失败</h1>")
		}
	}
	xhr.onerror = function() {
		console.log('网络异常')
	}
	xhr.send()
}

function loadMusic(musicObj){
	$('.info .title').innerText=musicObj.title
	$('.info .auther').innerText=musicObj.auther
	$('.cover').style.backgroundImage='url('+musicObj.img+')'
	audio.src=musicObj.src
	
}

