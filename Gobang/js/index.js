let me;
let chessBoard = [];
/*赢法数组*/
let wins = [];
/*多少种赢法*/
let count;
/*赢法统计数组*/
let myWin = [];
let computerWin = [];
let over;
let isNewGame = false;
let chess;
let context;

let $ = (id)=>{
	return document.getElementById(id);
}

let drawChessBoard = () => {
	context.strokeStyle = "#ffffff";
	for (var i = 0; i < 15; i++) {	
		context.moveTo( 15 , 15+i*30 );
		context.lineTo( 435 , 15+i*30 );
		context.moveTo( 15+i*30 , 15 );
		context.lineTo( 15+i*30 , 435 );
		context.stroke();
	}
};

let oneStep = (i,j,me) => {

	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	var grd = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if (me) {
		grd.addColorStop(0,"#0a0a0a");
		grd.addColorStop(1,"#636766");
	}else{
		grd.addColorStop(0,"#d1d1d1");
		grd.addColorStop(1,"#f9f9f9");
	}
	context.fillStyle = grd;
	context.fill();
	context.closePath();
};

let newGame = () => {
	me=true;
	over =false;

	chessBoard = [];
	/*赢法数组*/
	wins = [];

	/*赢法统计数组*/
	myWin = [];
	computerWin = [];

	chess = null;
	context = null;

	$("box").innerHTML = '<canvas id="chess" width="450" height="450"></canvas>';
 	chess = document.getElementById("chess");
 	context = chess.getContext("2d");
	chess.style.backgroundColor = '#A67D3D';


	/*初始化棋盘数据*/
	for (let i = 0; i < 15; i++) {
		chessBoard[i] = [];
		for (let j = 0; j < 15; j++) {
			chessBoard[i][j] = 0;
		}
	}

	/*初始化赢法数据*/
	for (let i = 0; i < 15; i++) {
		wins[i] = [];
		for (let j = 0; j < 15; j++) {
			wins[i][j] = [];
		}
	}

	/*计算有多少种赢法*/
	count = 0;

	for (let i = 0; i < 15; i++) { //横线五子
		for (let j = 0; j < 11; j++) {
			for (let k = 0; k < 5; k++) {
				wins[i][j+k][count] = true;
			}
			count++;
		}
	}

	for (let i = 0; i < 11; i++) { //竖线五子
		for (let j = 0; j < 15; j++) {
			for (let k = 0; k < 5; k++) {
				wins[i+k][j][count] = true;
			}
			count++;
		}
	}

	for (let i = 0; i < 11; i++) { //斜线(\)五子
		for (let j = 0; j < 11; j++) {
			for (let k = 0; k < 5; k++) {
				wins[i+k][j+k][count] = true;
			}
			count++;
		}
	}

	for (let i = 14; i >= 4; i--) { //斜线(/)五子
		for (let j = 0; j < 11; j++) {
			for (let k = 0; k < 5; k++) {
				wins[i-k][j+k][count] = true;				
			}
			count++;
		}
	}

	/*初始化每一种赢法*/
	
	for (let i = 0; i < count; i++) {
		myWin[i] = 0;
		computerWin[i] = 0;
	}

	chess.onclick = function(e){
		myClick(e);
	}
	
};


var gameOver = (me) => {
	over = true;
	let a;
	if (me) {
		a = confirm("你赢了，是否重新开始");
	}else{
		a = confirm("电脑赢了，是否重新开始");
	}
	if (a) {

		setTimeout(() => {
			newGame();
			drawChessBoard();
		},200); 

	}
};


var computerAI = () => {
	let myScore = [];
	let computerScore = [];
	/*保存最大的分数和相应坐标*/
	let max = 0;
	let u = 0,v = 0;

	/*棋盘每个点得分归零*/
	for (let i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (let j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}

	/**/
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < 15; j++) {
			if(chessBoard[i][j] == 0){

				for (let k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						switch(myWin[k]){
							case 1 : myScore[i][j] += 200;break;
							case 2 : myScore[i][j] += 500;break;
							case 3 : myScore[i][j] += 2000;break;
							case 4 : myScore[i][j] += 10000;break;
						}
						switch(computerWin[k]){
								case 1 : computerScore[i][j] += 220;break;
								case 2 : computerScore[i][j] += 520;break;
								case 3 : computerScore[i][j] += 2200;break;
								case 4 : computerScore[i][j] += 20000;break;
						}
					}
				}

				if (myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				}else if (myScore[i][j] == max) {
					if (computerScore[i][j] > computerScore[u][v]) {						
						u = i;
						v = j;
					}
				}
				if (computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if (computerScore[i][j] == max) {
					if (myScore[i][j] > myScore[u][v]) {						
						u = i;
						v = j;
					}
				}

			}
		}
	}


	oneStep(u,v,false);
	chessBoard[u][v] = 2;
	

	for (let k = 0; k < count; k++) {
		if (wins[u][v][k]) {
			computerWin[k]++;
			myWin[k] = 6;
			if (computerWin[k] == 5) { gameOver(me); }
		}
	}
	if (!over) {
		me = !me;
	}

		

};


window.onload = ()=> {
	newGame();
	drawChessBoard();
};

function myClick(e){
	if (over || !me) return;
	var i = Math.floor(e.offsetX/30);
	var j = Math.floor(e.offsetY/30);
	if (chessBoard[i][j] != 0)return;
	oneStep(i,j,me);
	chessBoard[i][j] = 1;
		
	for (let k = 0; k < count; k++) {
		if (wins[i][j][k]) {
			myWin[k]++;
			computerWin[k] = 6;
			if (myWin[k] == 5) { gameOver(me); }
		}
	}

	if (!over) {
		me = !me;
		computerAI();
	}
};


$("new-btn").onclick = () => {
	var a = confirm("是否重新开始");
	if (a) {
		me = true;
		newGame();
		drawChessBoard();
	}
}
