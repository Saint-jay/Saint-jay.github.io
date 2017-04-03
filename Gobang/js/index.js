let can = document.getElementById('canvas');
let cxt = can.getContext('2d');
let self = true;
let over = false;
let canBoard = [];
//赢法数组
let wins = [];
//索引，第几种赢法
let count = 0;
//赢法统计数组
let myWin = [];
let computerWin = [];

can.style.backgroundColor = '#A67D3D';
for (let i = 0; i < 15; i++) {
	wins[i] = [];
	for (let j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}
//所有横线赢法
for (let i = 0; i < 15; i++) {
	for (let j = 0; j < 11; j++) {
		//wins[0][0][0] = true
		//wins[0][1][0] = true
		//wins[0][2][0] = true
		//wins[0][3][0] = true
		//wins[0][4][0] = true
		
		//wins[0][1][1] = true
		//wins[0][2][1] = true
		//wins[0][3][1] = true
		//wins[0][4][1] = true
		//wins[0][5][1] = true
		for (let k = 0; k < 5; k++) {
			wins[i][j+k][count] = true;
		}
		count++;
	}
}
//所有竖线赢法
for (let i = 0; i < 15; i++) {
	for (let j = 0; j < 11; j++) {
		for (let k = 0; k < 5; k++) {
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//所有斜线赢法
for (let i = 0; i < 11; i++) {
	for (let j = 0; j < 11; j++) {
		for (let k = 0; k < 5; k++) {
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//所有反斜线赢法
for (let i = 0; i < 11; i++) {
	for (let j = 14; j > 3; j--) {
		for (let k = 0; k < 5; k++) {
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}
console.log(count)

//赢法统计数组，初始化
for (let i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
}


for (let i = 0; i < 15; i++) {
	canBoard[i] = [];
	for (let j = 0; j < 15; j++) {
		canBoard[i][j] = 0;
	}
}

cxt.strokeStyle = '#000000';
for (let i = 0; i < 15; i++) {
	//竖线
	cxt.moveTo(15 + i*30,15);
	cxt.lineTo(15 + i*30,435);
	cxt.stroke();
	//横线
	cxt.moveTo(15,15 + i*30);
	cxt.lineTo(435,15 + i*30);
	cxt.stroke();
}



//画棋子
function oneStep(i,j,self){
	cxt.beginPath();
	cxt.arc(15 + i*30,15 + j*30,13,0,2*Math.PI);
	cxt.closePath();
	let gradient = cxt.createRadialGradient(15 + i*30 +2,15 + j*30 -2,13,15 + i*30 +2,15 + j*30 -2,0);
	if(self){
		gradient.addColorStop(0,'#0a0a0a');
		gradient.addColorStop(1,'#636766');
	}else{
		gradient.addColorStop(0,'#d1d1d1');
		gradient.addColorStop(1,'#f9f9f9');
	}
	cxt.fillStyle = gradient;
	cxt.fill();
}
//下棋子
can.onclick = function(ev){
	if(over)return;
	if(!self)return;
	let x = ev.offsetX;
	let y = ev.offsetY;
	let i = Math.floor(x/30);
	let j = Math.floor(y/30);
	if(canBoard[i][j] == 0){
		oneStep(i,j,self);
		canBoard[i][j] = 1;
		for (let k = 0; k < count; k++) {
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k] = 6;
				if(myWin[k] == 5){
					alert('恭喜！你赢啦！');
					over = true;
				}
			}
		}
		if(!over){
			self = !self;
			computerAi();
		}
	}
}

function computerAi(){
	let myScore = [];
	let computerScore = [];
	let max = 0;
	let u = 0, v = 0;
	for (let i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (let j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < 15; j++) {
			if(canBoard[i][j] == 0){
				for (let k = 0; k < count; k++) {
					if(wins[i][j][k]){
						//my
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}else if(myWin[k] == 3){
							myScore[i][j] += 2000;
						}else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}
						//computer
						if(computerWin[k] == 1){
							computerWin[i][j] += 220;
						}else if(computerWin[k] == 2){
							computerWin[i][j] += 420;
						}else if(computerWin[k] == 3){
							computerWin[i][j] += 2100;
						}else if(computerWin[k] == 4){
							computerWin[i][j] += 20000;
						}
					}
				}
				//my
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if(myScore[i][j] == max){
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}
				//computer
				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if(computerScore[i][j] == max){
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	canBoard[u][v] = 2;
	for (let k = 0; k < count; k++) {
		if(wins[u][v][k]){
			computerWin[k]++;
			myWin[k] = 6;
			if(computerWin[k] == 5){
				alert('计算机赢啦！');
				over = true;
			}
		}
	}
	if(!over){
		self = !self;
	}
}

