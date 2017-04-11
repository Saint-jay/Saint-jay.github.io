function Show(){
window.location.hash = '';
sTO = setTimeout(()=>{
	$('#loading').css('display','none')
	if($('#loading').css('display') == 'none'){
		window.location.hash = 'man=trump';
	}
	sTO = null;
},2000)


//init
$('body').height(window.innerHeight)
$('rect').css('transition','1s')
$('rect').attr({
	'x' : -(window.innerWidth/2),
	'y' : -(window.innerHeight/2)+100,
	'width' : window.innerWidth*2,
	'height' : window.innerHeight*2
})


//bottomLi生成
$.each(json.man, (i,e) => {
	$('#bottom_bar').append(`<li style="background-image:${e.src};" name="${i}" num="${e.id}"></li>`)
});
$('#bottom_bar li').height($('#bottom_bar li').width()/0.85)
$('#bottom_bar li').eq(7).addClass('filter');


//bottomLi事件
$.each($('#bottom_bar li'), (i) => {
	//点击设置hash值
	$('#bottom_bar li').eq(i).click(function(){
		window.location.hash = 'man='+ $(this).attr('name');
	})
	//移动添加class
	$('#bottom_bar li').eq(i).mouseover(() => {
		$('#bottom_bar li').eq(i).addClass('hover').siblings('li').removeClass('hover');
	})
	//移出删除class
	$('#bottom_bar li').eq(i).mouseout(() => {
		$('#bottom_bar li').eq(i).removeClass('hover');
	})
})



//菜单变形函数
function menuLine(rotate,rotateT,top,opa,bottom){
	$('#menu span').eq(0).css({
		'transform':rotate,
		'top':top
	})
	$('#menu span').eq(1).css({
		'transform':rotate,
		'opacity':opa
	})
	$('#menu span').eq(2).css({
		'transform':rotateT,
		'bottom':bottom
	})
}


//菜单and </> 样式函数 
function menuSpanOpa(color,urls,urlsT){
	$('#menu span').css('background-color',color)
	$('#prev').css('background-image',urls)
	$('#next').css('background-image',urlsT)
}



//菜单变形事件
let onOff = true;
$('#menu').click(() => {
	if(onOff == false){
		menuLine('rotate(0deg)','rotate(0deg)','0px','1','0px')
		$('#content').css('transform','translateY(0px)')
		onOff = true;
		return;
	}
	onOff = false;
	menuLine('rotate(45deg)','rotate(135deg)','13px','0','13px');
	$('#content').css('transform','translateY(100px)')
})



//上一个
$('#prev').click(() => {
	let n = $('.filter').eq(0).attr('num');
	n--;
	if(n < 0){n = $('#bottom_bar li').length-1;}
	$.each(json.man, (i,e) => {
		if(n==e.id){
			window.location.hash = 'man='+ i;
		}
	});
})

//下一个
$('#next').click(() => {
	let n = $('.filter').eq(0).attr('num');
	n++;
	if(n > $('#bottom_bar li').length-1){n = 0;}
	$.each(json.man, (i,e) => {
		if(n==e.id){
			window.location.hash = 'man='+ i;
		}
	});
})





//svgPath变形函数
function path(d,fill,fillOpacity,rectFill,viewBox,i){
	$('path').eq(i).css('transition','0s')
	$('path').eq(i).css('transition','.5s')
	$('path').eq(i).attr({
		'd' : d[i],
		'fill' : fill[i],
		'fill-opacity' : fillOpacity[i]
	})
	$('#svg svg').attr('viewBox',viewBox);
	$('rect').attr('fill',rectFill);
}



//hash值判断
$(window).on('hashchange',() => {
	let name = location.hash.split('=')[1];
	hashEvent(name)
})



//对应hash改变的事件
function hashEvent(name){
	function colour(num,sName,sDetails,years,color){
		$('#bottom_bar li').eq(num).addClass('filter').siblings('li').removeClass('filter');
		//新增改名字和详情
		$('#nameDetails div').css({'transition':'0s','transform':'translate3D(0,-100%,0)'})
		$('#name div').html(sName)
		$('#Details div').html(sDetails)
		sTT = setTimeout(() => {
			$('#nameDetails div').css({'transition':'1s','transform':'translate3D(0,0%,0)'})
			sTT = null;
		},100)
		//新增任职年份
		$('#years').html(years)
		//年份和详情颜色
		$('#years').css('color',color)
		$('#nameDetails').css('color',color)
	}
	
	
	//判断
	switch (name){
		//0
		case 'hoover':
			$.each($('path'), (i) => {
				path(json.man.hoover.d,json.man.hoover.fill,json.man.hoover.fillOpacity,json.man.hoover.rectFill,json.man.hoover.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(0,json.man.hoover.name,json.man.hoover.details,json.man.hoover.years,'rgba(255,255,255,.4)');
			break;
		//1
		case 'droosevelt':
			$.each($('path'), (i) => {
				path(json.man.droosevelt.d,json.man.droosevelt.fill,json.man.droosevelt.fillOpacity,json.man.droosevelt.rectFill,json.man.droosevelt.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(1,json.man.droosevelt.name,json.man.droosevelt.details,json.man.droosevelt.years,'rgba(255,255,255,.4)');
			break;
		//2
		case 'truman':
			$.each($('path'), (i) => {
				path(json.man.truman.d,json.man.truman.fill,json.man.truman.fillOpacity,json.man.truman.rectFill,json.man.truman.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(2,json.man.truman.name,json.man.truman.details,json.man.truman.years,'rgba(255,255,255,.4)');
			break;
		//3
		case 'eisenhower':
			$.each($('path'), (i) => {
				path(json.man.eisenhower.d,json.man.eisenhower.fill,json.man.eisenhower.fillOpacity,json.man.eisenhower.rectFill,json.man.eisenhower.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(3,json.man.eisenhower.name,json.man.eisenhower.details,json.man.eisenhower.years,'rgba(255,255,255,.4)');
			break;
		//4
		case 'kennedy':
			$.each($('path'), (i) => {
				path(json.man.kennedy.d,json.man.kennedy.fill,json.man.kennedy.fillOpacity,json.man.kennedy.rectFill,json.man.kennedy.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(4,json.man.kennedy.name,json.man.kennedy.details,json.man.kennedy.years,'rgba(255,255,255,.4)');
			break;
		//5
		case 'bjohnson':
			$.each($('path'), (i) => {
				path(json.man.bjohnson.d,json.man.bjohnson.fill,json.man.bjohnson.fillOpacity,json.man.bjohnson.rectFill,json.man.bjohnson.viewBox,i)
			})
			menuSpanOpa('rgba(0,0,0,.5)','url(img/left-arrow_dark.svg)','url(img/right-arrow_dark.svg)')
			colour(5,json.man.bjohnson.name,json.man.bjohnson.details,json.man.bjohnson.years,'rgba(0,0,0,.4)');
			break;
		//6
		case 'nixon':
			$.each($('path'), (i) => {
				path(json.man.nixon.d,json.man.nixon.fill,json.man.nixon.fillOpacity,json.man.nixon.rectFill,json.man.nixon.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(6,json.man.nixon.name,json.man.nixon.details,json.man.nixon.years,'rgba(255,255,255,.4)');
			break;
		//7
		case 'trump':
			$.each($('path'), (i) => {
				path(json.man.trump.d,json.man.trump.fill,json.man.trump.fillOpacity,json.man.trump.rectFill,json.man.trump.viewBox,i)
			})
			menuSpanOpa('rgba(0,0,0,.5)','url(img/left-arrow_dark.svg)','url(img/right-arrow_dark.svg)')
			colour(7,json.man.trump.name,json.man.trump.details,json.man.trump.years,'rgba(0,0,0,.4)');
			break;
		//8	
		case 'obama':
			$.each($('path'), (i) => {
				path(json.man.obama.d,json.man.obama.fill,json.man.obama.fillOpacity,json.man.obama.rectFill,json.man.obama.viewBox,i)
			})
			menuSpanOpa('rgba(0,0,0,.5)','url(img/left-arrow_dark.svg)','url(img/right-arrow_dark.svg)')
			colour(8,json.man.obama.name,json.man.obama.details,json.man.obama.years,'rgba(0,0,0,.4)');
			break;
		//9
		case 'gwbush':
			$.each($('path'), (i) => {
				path(json.man.gwbush.d,json.man.gwbush.fill,json.man.gwbush.fillOpacity,json.man.gwbush.rectFill,json.man.gwbush.viewBox,i)
			})
			menuSpanOpa('rgba(0,0,0,.5)','url(img/left-arrow_dark.svg)','url(img/right-arrow_dark.svg)')
			colour(9,json.man.gwbush.name,json.man.gwbush.details,json.man.gwbush.years,'rgba(0,0,0,.4)');
			break;
		//10
		case 'clinton':
			$.each($('path'), (i) => {
				path(json.man.clinton.d,json.man.clinton.fill,json.man.clinton.fillOpacity,json.man.clinton.rectFill,json.man.clinton.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(10,json.man.clinton.name,json.man.clinton.details,json.man.clinton.years,'rgba(255,255,255,.4)');
			break;
		//11
		case 'hwbush':
			$.each($('path'), (i) => {
				path(json.man.hwbush.d,json.man.hwbush.fill,json.man.hwbush.fillOpacity,json.man.hwbush.rectFill,json.man.hwbush.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(11,json.man.hwbush.name,json.man.hwbush.details,json.man.hwbush.years,'rgba(255,255,255,.4)');
			break;
		//12
		case 'reagan':
			$.each($('path'), (i) => {
				path(json.man.reagan.d,json.man.reagan.fill,json.man.reagan.fillOpacity,json.man.reagan.rectFill,json.man.reagan.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(12,json.man.reagan.name,json.man.reagan.details,json.man.reagan.years,'rgba(255,255,255,.4)');
			break;
		//13
		case 'carter':
			$.each($('path'), (i) => {
				path(json.man.carter.d,json.man.carter.fill,json.man.carter.fillOpacity,json.man.carter.rectFill,json.man.carter.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(13,json.man.carter.name,json.man.carter.details,json.man.carter.years,'rgba(255,255,255,.4)');
			break;
		//14
		case 'ford':
			$.each($('path'), (i) => {
				path(json.man.ford.d,json.man.ford.fill,json.man.ford.fillOpacity,json.man.ford.rectFill,json.man.ford.viewBox,i)
			})
			menuSpanOpa('rgba(255,255,255,.5)','url(img/left-arrow_light.svg)','url(img/right-arrow_light.svg)')
			colour(14,json.man.ford.name,json.man.ford.details,json.man.ford.years,'rgba(255,255,255,.4)');
			break;
		default:
			break;
	}
}






//navintro刷新事件/F5
$('#intro').click(()=> {
	window.location.reload();
})

//about me
$('#about').click(() => {
	onOff = true;
	menuLine('rotate(0deg)','rotate(0deg)','0px','1','0px')
	$('#content').css('transform','translateY(0px)')
	sTTr = setTimeout(() => {
		$('#self').css({
			'transform': 'translate3d(0%,0,0)',
			'opacity':'1'
		})
		sTF = setTimeout(() => {
			$.each($('polygon'), function(i) {
				$('polygon').eq(i).css({
					'transition':Math.random()*6+'s',
					'transform': 'translateY(0px)'
				})
			});
			sTF = null;
		},1500)
		sTTr = null;
	},500)
})


//self初始化
$.each($('polygon'),function(i){
	$('polygon').eq(i).css({
		'transform': 'translateY(-2000px)'
	})
})

//self关闭
$('#selfClose').click(() => {
	$('#self').css({'transform': 'translate3d(-100%,0,0)'})
})





//canvas背景
let can = document.getElementById("canvas");
let cxt = can.getContext('2d');
let canW = can.width = window.innerWidth;
let canH = can.height = window.innerHeight;
let circleNum = 80;//生成点个数
let circlePos = [];//存圆x,y坐标
let moveX = null;
let moveY = null;

//生成圆
for (let i = 0; i < circleNum; i++) {
	circlePos[i] = {
		x : Math.random()*canW,
		y : Math.random()*canH,
		cX : Math.random()*1-0.5,
		cY : Math.random()*1-0.5
	}
	drawCircle(circlePos[i].x,circlePos[i].y)
}

//x移动规律
function xMove(i){
	circlePos[i].x += circlePos[i].cX;
	if(circlePos[i].x > window.innerWidth){
		circlePos[i].x = window.innerWidth;
		circlePos[i].cX = -circlePos[i].cX;
	}else if(circlePos[i].x <0){
		circlePos[i].cX = -circlePos[i].cX;
	}
}
//y移动规律
function yMove(i){
	circlePos[i].y += circlePos[i].cY;
	if(circlePos[i].y > window.innerHeight){
		circlePos[i].y = window.innerHeight;
		circlePos[i].cY = -circlePos[i].cY;
	}else if(circlePos[i].y <0){
		circlePos[i].cY = -circlePos[i].cY;
	}
}

//(x2-x1)2 + (y2-y1)2 = 斜边 
function xyLine(i){
	for (let j = 0; j < circleNum; j++) {
		let xPow = Math.pow(circlePos[i].x - circlePos[j].x,2);
		let yPow = Math.pow(circlePos[i].y - circlePos[j].y,2);
		if( xPow + yPow <= 80*80 ){
			drawLine(circlePos[i].x,circlePos[i].y,circlePos[j].x,circlePos[j].y)
		}
	}
}

(function draw(){
	cxt.clearRect(0,0,canW,canH)
	drawRectangle()
	for (let i = 0; i < circleNum; i++) {
		xMove(i)
		yMove(i)
		drawCircle(circlePos[i].x,circlePos[i].y)
		xyLine(i)
		if(ballMouse(circlePos[i]) < 130){
			drawLine(moveX,moveY,circlePos[i].x,circlePos[i].y)
		}
	}
	window.requestAnimationFrame(draw)
})()


//画圆
function drawCircle(x,y){
	cxt.save()
	cxt.fillStyle = 'rgba(255, 255, 255, 0.5)';
	cxt.beginPath()
	cxt.arc(x,y,3,0,2*Math.PI,true)
	cxt.closePath()
	cxt.fill()
	cxt.restore()
}

//画线
function drawLine(x1,y1,x2,y2){
	cxt.save()
	let lin = cxt.createLinearGradient(x1,y1,x2,y2);
	lin.addColorStop(0,'#66ffff')
	lin.addColorStop(1,'#990099')
	cxt.strokeStyle = lin;
	cxt.beginPath()
	cxt.moveTo(x1,y1)
	cxt.lineTo(x2,y2)
	cxt.stroke()
	cxt.restore()
}

//画矩形
function drawRectangle(){
	cxt.save()
	let Rectangle = cxt.createLinearGradient(0,0,0,window.innerHeight);
	Rectangle.addColorStop(0,'#9cc1c9')
	Rectangle.addColorStop(1,'#8469b8')
	cxt.beginPath(); 
	cxt.fillStyle=Rectangle;
	cxt.fillRect(0,0,window.innerWidth,window.innerHeight);
	cxt.restore()
}

//鼠标移动
can.addEventListener('mousemove',function(e){
	moveX = e.clientX;
	moveY = e.clientY;
})

//鼠标移动获取当前点到其他圆
function ballMouse(obj){
	let disX = Math.abs(moveX - obj.x)
	let disY = Math.abs(moveY - obj.y)
	return Math.sqrt(disX*disX + disY*disY)
}






window.onresize = function(){
	can.width = window.innerWidth;
	can.height = window.innerHeight;
	$('body').height(window.innerHeight)
	$('#bottom_bar li').height($('#bottom_bar li').width()/0.85)
}


}
