var pos = {}; 
var panda = {start: false, width: 352, height: 352, size: 4, iswin: false, difficulty:5 };

window.onload = function() { 
	init();
	$("#restart").click(function() {// divide the picture into 16 pieces with one is blank
		makePieces();
	});
	$("#difficulty").change(function() {//  select different difficulty
		panda.difficulty = $("#difficulty").find("option:selected").val();
	});
}
function init() {
	$("#count").val(0);
	$("#time").val(0);
	$("#status").html("Wait to play!");
	panda.start = panda.iswin = false;
	pos = {};
	time = 0;
	clock = null;
	appendPieces();
}
function makePieces() {
	stopCount();
	$("#time").val(0);
	$("#count").val(0);
	panda.start = false;
	timeCount();
	remove();
	if ($("#blank") == null) all.eq(15).id("blank");  // here
	addMove();
	random();
	panda.iswin = false;
	panda.start = true;
	$("#status").html(" ");
	$("#count").val(0);
}
function random() {
	for (var i = 0; i < panda.difficulty; i++) {  //If the value of val is larger, the difficulty will increase.
		var canMove = $(".canMove");
		if (canMove.length == 0) return false;
		var index = Math.floor(Math.random() * canMove.length);
		canMove.eq(index).click(); // here
	}
}
//  here can be improved
function createPieces(num) {
	var pieces = document.createElement('div');
	if (pieces.className.indexOf("each") == -1)
		pieces.className += " " + "each";
	pieces.index = num;
	var top = parseInt(num / 4) * 88;
	var left = num % 4 * 88;
	pieces.style.top = top + 'px';
	pieces.style.left = left + 'px';
	pieces.style.backgroundPosition = left * -1 + 'px' + ' ' + top * -1 + 'px';
	return pieces;
}
function appendPieces() {
	var area =  document.getElementById("mainarea");
	for (var i = 0; i < 16; i++) {
		var pieces = createPieces(i);
		if (i == 15) pieces.id = 'blank';
		pos[i] = pieces;
		area.appendChild(pieces);
		pieces.onclick = function() { onclickPieces(this); }
	}
}
function onclickPieces(obj) {
	var flag = obj.className.indexOf("canMove") != -1 ? 1:0;
	if (!flag) return;
	remove();
	move(obj);
	if (panda.start && hasWin()) {
		whenWin();
	} else {
		addMove();
	}
	var temp = $("#count").val();
	$("#count").val(++temp);
}
function whenWin() {
	$("#blank").id = "";
	$("#status").html("You Win!");
	stopCount();
	panda.iswin = true;
}
function timeCount() {
	time = 0;
	clock = setInterval(function() { $("#time").val(++time); }, 1000);
}
function stopCount() {
	clearInterval(clock);
}
function hasWin() {
	for (var i = 0; i < 16; ++i) {
		if (pos[i].index != i)
			return false;
	}
	panda.start = false;
	panda.iswin = true;
	return true;
}

function move(obj) {
	var blankIndex = getIndex(document.getElementById("blank"));
	var blankX = blankIndex[0], blankY = blankIndex[1];
	var index = getIndex(obj);
	var x = index[0], y = index[1];
	if (x != blankX && y != blankY) return false;
	var direction;
	if (x == blankX) direction = y < blankY ? 0 : 2;
	else direction = x < blankX ? 3 : 1;
	var end = (x == blankX) ? y : x;
	myReplace(blankX, blankY, end, direction);
	return true;
}
//  replace the blank with the one clicked
function myReplace(blankX, blankY, end, direction) {
	var move = specificPosition(blankX, blankY, end, direction);
	move.unshift(blankY * 4 + blankX);
	for (var i = 0; i < move.length - 1; i++) {
		var tempVal = pos[move[i+1]].style.top;
		pos[move[i+1]].style.top = pos[move[i]].style.top;
		pos[move[i]].style.top = tempVal;
		tempVal = pos[move[i+1]].style.left;
		pos[move[i+1]].style.left = pos[move[i]].style.left;
		pos[move[i]].style.left = tempVal;
		var temp = pos[move[i+1]];
		pos[move[i+1]] = pos[move[i]];
		pos[move[i]] = temp;	
	}
}
function myreplace(val1, val2) {
	var temp = val1;
	val1 = val2;
	val2 = temp;
}
function remove() {
	var all = $("#mainarea .each");
	for (var i = 0; i < 16; i++) {
		all.eq(i).removeClass("canMove");
	}
}
//  four directions
function addMove() {
	var blank = document.getElementById("blank");
	if (!blank) return;
	var index = getIndex(blank);
	var x = index[0], y = index[1];
	for (var i = 0; i < 4; i++) {
		var end = i % 3 && 3;
		var result = specificPosition(x, y, end, i);
		for (var j in result) {
			if (pos[result[j]].className.indexOf("canMove") == -1)
				pos[result[j]].className += " " + "canMove";
		}
	}
}
function getIndex(obj) {
	var y = parseInt(obj.style.top) / 88;
	var x = parseInt(obj.style.left) / 88;
	return [x, y];
}
//up, right, down, left(0, 1, 2, 3)
function specificPosition(x, y, end,direction) {
	if (direction < 0 || direction > 3) return null;
	var result = [];
	var addOnX, addOnY;
	addOnX = (direction % 2 == 0) ? 0 : ((x < end) ? 1:-1);
	addOnY = (direction % 2 == 0) ? ((y < end) ? 1:-1) : 0;
	while ((addOnX != 0 && x != end)|| (addOnY != 0 && y != end)) {
		x += addOnX;
		y += addOnY;
		result.push(y * 4 + x);
		break;
	}
	return result;
}
