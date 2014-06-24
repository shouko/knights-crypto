// Originated from: http://notepad.yehyeh.net/Content/Algorithm/Famous/KnightTour/KnightTour.php

var I = 8;
var J = 8;

var $displayElement = $('#demoDiv');
var print = function(msg){
	$displayElement.append(msg);
};
var println = function(msg){
	print(msg + '<br />');
};

// 宣告一個8x8的陣列,作為棋盤
var getNewChessboard = function(){
	var chessboard  = new Array(I);
	for(var i = 0; i < I; i++)
		chessboard[i] = new Array(J);
	for(var i = 0; i < I; i++){
		for(var j = 0; j < J; j++)
			chessboard[i][j] = 0;
	}
	return chessboard;
};

var getStepCoord = function(step){
	for(var i = 0; i < I; i++)
		for(var j = 0; j < J; j++)
			if( chessboard[i][j] == step)
				return {x:i, y:j};
}
var getTD = function(coord){
	return $('#chessboard tr').eq(coord.y).find('td').eq(coord.x);
};
var getStepTD = function(step){
	return getTD(getStepCoord(step));
};
var curShowStep = 1;
var timer;
var showStep = function(){
	var $td = getStepTD(curShowStep);
	$td.html(curShowStep);
	if(curShowStep++ < ( ( I * J ) + 1 ) ){
		timer = setTimeout(showStep, 500);
	}
};
var showResult = function(){
	curShowStep = 1;
	curstep = 1;
	chessboard  = getNewChessboard();
	count = 0 ;
	$('#chessboard td').html('');
	clearTimeout(timer);
	knightTour(getRandomCoord());
};

var steps = [{ x:-2, y:1}, {x:-1, y:2}, {x:1, y:2}, {x:2, y:1},
	            {x:2, y:-1}, {x:1, y:-2}, {x:-1, y:-2}, {x:-2, y:-1}];
var chessboard  = getNewChessboard();
var curstep = 1;
var count = 0;
var knightTour = function(coord){
	count++;
	var next = { x: 0, y: 0};
	chessboard[coord.x][coord.y] = curstep++;
	if(count > 30000000)
		return true;

	if(curstep > I*J) {
		showStep();
		return true;
	}else{
		for(var i = 0; i < 8; i++){
			next.x = coord.x + steps[i].x;
			next.y = coord.y + steps[i].y;
			if(next.x >= 0 && next.x <= (I-1) && next.y >= 0 && next.y <= (J-1) && chessboard[next.x][next.y] == 0){
				if(knightTour(next))
					return true;
			}
		}
		chessboard[coord.x][coord.y] = 0;
		curstep--;
		return false;
	}
};

var getRandomCoord = function(){
	//return { x: Math.floor((Math.random()*I)), y: Math.floor((Math.random()*J))};
	var data = [{x: 0, y:0}, {x:0, y:3}, {x:0, y:4}, {x:3, y:0}, {x:3, y:5}, {x:4, y:2}, {x:7, y:0}, {x:7, y:7}];
	return data[Math.floor((Math.random()*8))];
};


function init(){
	//var coord = getRandomCoord();
	I = $('#I').val();
	J = $('#J').val();

	curstep = 1;
	chessboard  = getNewChessboard();
	count = 0 ;

	var table = '<tbody>';
	for(var i = 0; i < I; i++){
		table += '<tr>';
		for(var j = 0; j < J; j++){
			table += '<td></td>';
		}
		table += '</tr>';
	}
	table += '</tbody>';

	$('#chessboard').html(table);

	$('#chessboard td').css(
		{	'display': 'inline-block',
			'width': ' 30px',
			'height': '30px',
			'padding': '0',
			'border':  'solid 1px black',
			'line-height': '30px',
			'text-align': 'center',
			'color': 'DodgerBlue',
			'font-size': '16px',
			'font-weight': 'bold'
		});
	$('#chessboard').css('border-right', 'none');
	$('#chessboard tr:even td:odd').css('background', 'Black');
	$('#chessboard tr:odd td:even').css('background', 'Black');
	showResult();
}
