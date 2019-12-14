/*
* @Author: Administrator·杨振贺
* @Date:   2019-12-08 18:28:02
* @Last Modified by:   Administrator·杨振贺
* @Last Modified time: 2019-12-13 21:58:42
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
	}, 30)
}

var span = document.getElementById("span");
var box = document.getElementById("box");
var logo = document.getElementById("logo");
var left = document.getElementById("left");
var right = document.getElementById("right");
var li = document.getElementsByTagName("li");

// var img = document.getElementsByName("img");
var index = 1;
var move = false;
var ppp = setInterval(function(){
	var now = parseInt(getStyle(span,"left"));
	if(now == -443){
		span.style.left = "900px";
	}
	else{
		span.style.left = now - 1 + "px";
	}
}, 20);

function next(){
	if(!move){
		move = true;
		index++;
		navCh();
		animate(logo,{left:-1200*index},function(){
			if(index === 6){
				logo.style.left = "-1200px";
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
		animate(logo,{left:-1200*index},function(){
			if(index === 0){
				logo.style.left = "-6000px";
				index = 5;
			}	
			move = false;
		});
	}		
}
var timer = setInterval(next,2000);
box.onmouseover = function(){
	animate(right,{opacity: 50});
	animate(left,{opacity:50});
	clearInterval(timer);
}
box.onmouseout = function(){
	animate(right,{opacity:0});
	animate(left,{opacity:0});
	timer = setInterval(next,2000);
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
		animate(logo,{left:-1200*index});
		navCh();
	}
}
function navCh(){
	for(var i = 0;i < li.length; i++){
		li[i].className = "";
	}
	if(index ===6){
		li[0].className = "li";
	}
	else {
		if(index === 0){
			li[4].className = "li";
		}else{
			li[index-1].className = "li";
		}
	}
}