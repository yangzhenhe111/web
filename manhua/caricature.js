/*
* @Author: Administrator·杨振贺
* @Date:   2019-12-24 18:05:03
* @Last Modified by:   Administrator·杨振贺
* @Last Modified time: 2019-12-25 17:47:45
*/
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 50)
}

//轮播图
var span = document.getElementById("span");
var screen = document.getElementById("screen");
var logo = document.getElementById("carousel");
var left = document.getElementById("left");
var right = document.getElementById("right");
var li = document.getElementsByClassName("li");
var index = 1;
var move = false;
function next(){
	if(!move){
		move = true;
		index++;
		navCh();
		animate(logo,{left:-1100*index},function(){
			if(index === 4){
				logo.style.left = "-1100px";
				index = 1;
			}
			move = false;
		});	
	}	
}
function prev(){
	if(!move){
		move = true;
		index--;
		navCh();
		animate(logo,{left:-1100*index},function(){
			if(index === 0){
				logo.style.left = "-3300px";
				index = 3;
			}	
			move = false;
		});
	}		
}
var timer = setInterval(next,3000);
screen.onmouseover = function(){
	clearInterval(timer);
}
screen.onmouseout = function(){
	timer = setInterval(next,3000);
}
left.onclick = function(){
	prev();
}
right.onclick = function(){
	next();
}

for(var i = 0;i < li.length; i++){
	li[i].idx = i;
	li[i].onclick = function(){
		index = this.idx+1;
		animate(logo,{left:-1100*index});
		navCh();
	}
}
function navCh(){
	for(var i = 0;i < li.length; i++){
		li[i].id = "";
	}
	if(index === 4){
		li[0].id = "selectli";
	}
	else {
		if(index === 0){
			li[2].id = "selectli";
		}else{
			li[index-1].id = "selectli";
		}
	}
}
//放大镜
var box = document.getElementById("box");
var photo = document.getElementsByClassName("photo");
var bigbox = document.getElementById("big");
var body = document.getElementById("columndiv");
for(var i=0; i<photo.length; i++){
	photo[i].onmouseover = (function(num){
		return function(){
			this.onmousemove = function(evt){
				var e = evt || event;
				var x = e.clientX;
				var y = e.clientY;
				if(x >= (body.offsetWidth - bigbox.offsetWidth)) {
					bigbox.style.left = x + 1 - bigbox.offsetWidth +"px";
					bigbox.style.top = y + 1 +"px";
				} else {
					bigbox.style.left = x + 1 +"px";
					bigbox.style.top = y + 1 +"px";
				}
			}
			bigbox.style.display = "block";
			
			var oImg = document.createElement("img");
			oImg.src = "image/timg ("+(num+1)+").jpg";
			bigbox.innerHTML = "";
			bigbox.appendChild(oImg);
		}
	})(i);
	photo[i].onmouseout = function(){
		bigbox.style.display = "none";
	}
}
// 划出	
var sider = document.getElementById("siderr");
var erwei = document.getElementById("erwei");
sider.onmouseover = function(){
	starMove(-200);
}
sider.onmouseout = function(){
	starMove(30);
}
var timerr;
function starMove(end){
	clearInterval(timerr);
	timerr = setInterval(function(){
		var speed;
		if(erwei.offsetLeft > end){
			speed = -10;
		}
		else{
			speed = 10;
		}
		erwei.style.left = erwei.offsetLeft + speed + "px";
		if(erwei.offsetLeft == end){
			clearInterval(timerr);
		}
	}, 30);
}

//左滑出
// var sr = document.getElementsByClassName("siderright");
// var lili = document.getElementsByClassName("lili");
// sr.onmouseover = function(){
// 	starMove(-40);
// }
// sr.onmouseout = function(){
// 	starMove(0);
// }
// var timerrr;
// function starMove(end){
// 	clearInterval(timerrr);
// 	timerrr = setInterval(function(){
// 		var speed;
// 		if(sr.offsetLeft > end){
// 			speed = -10;
// 		}
// 		else{
// 			speed = 10;
// 		}
// 		sr.style.left = sr.offsetLeft + speed + "px";
// 		if(sr.offsetLeft == end){
// 			clearInterval(timerrr);
// 		}
// 	}, 30);
// }
