var pos = {}; 
var panda = {
	start: false,
	width: 352,  //  the size of given picture
	height: 352,
	size: 4,
    iswin: false,
    difficulty:5
};
function hasClass(obj, className) {
	return obj.className.indexOf(className) != -1;
}

function addClass(obj, className) {
	if (hasClass(obj, className)) {
		return;
	}
	obj.className += " " + className;
}

function removeClass(obj, className) {
	if (!hasClass(obj, className)) {
		return;
	}
	var classes = obj.className;
	var index = classes.indexOf(className);
	obj.className = classes.substring(0, index - 1) + classes.substring(index + className.length);
}

window.onload = function() { 
	init();
	document.getElementById("difficulty").onchange=function() {
		//  select different difficulty
		panda.difficulty = document.getElementById("difficulty").selectedOptions[0].value;
	}
	document.getElementById("restart").onclick = function() {
		// divide the picture into 16 pieces with one is blank
		makePieces();
	}
}


function init() {
	document.getElementById("count").value = 0;
	document.getElementById("time").value = 0;
	time = 0;
	clock = null;
	panda.start = false;
	panda.iswin = false;
	pos = {};
	document.getElementById("status").innerText = "Wait to play!";
	appendPieces();
}
function makePieces() {
	stopCount();
	document.getElementById("time").value = 0;
	document.getElementById("count").value = 0;
	panda.start = false;
	timeCount();
	var all = document.getElementsByClassName("each");
	for (var i = 0; i < 16; ++i)
		removeClass(all[i], 'canMove');
	if (document.getElementById("blank") == null) {
		all[15].id = 'blank';
	}

	remove();
	addMove();
	
	var val = panda.difficulty;
	for (var i = 0; i < val; i++) {  //If the value of val is larger, the difficulty will increase.
		var canMove = document.getElementsByClassName("canMove");
		if (canMove.length == 0) {
			return false;
		}
		var index = Math.floor(Math.random() * canMove.length);
		canMove[index].click();
	}
	panda.iswin = false;
	panda.start = true;
	document.getElementById("status").innerText = " ";
	document.getElementById("count").value = 0;
}

function createPieces(num) {
	var pieces = document.createElement('div');
	addClass(pieces, 'each');
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
		if (i == 15) {
			pieces.id = 'blank';
		}
		pos[i] = pieces;
		area.appendChild(pieces);
		pieces.onclick = function() {
			onclickPieces(this);
		}
	}
}

function onclickPieces(obj) {
	if (!hasClass(obj, 'canMove')) {
		return;
	}
	remove();
	move(obj);
	if (panda.start && hasWin()) {
		document.getElementById("blank").id  = "";
		document.getElementById("status").innerText = "You Win!";
		stopCount();
		panda.iswin = true;
	} else {
		addMove();
	}
	alert("Yes"+document.getElementById("count").value);
	document.getElementById("count").value++;  //  notice not to use += 1, it appears as 01, 011
}
function timeCount() {
	time = 0;
	clock = setInterval(addTime, 1000);
}
function addTime() {
		time++;
		document.getElementById("time").value = time;
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

	if (x != blankX && y != blankY) {
		return false;
	}
	var direction;
	if (x == blankX) {
		direction = y < blankY ? 0 : 2;
	} else {
		direction = x < blankX ? 3 : 1;
	}
	var end = (x == blankX) ? y : x;
	var move = specificPosition(blankX, blankY, end, direction);
	//  replace the blank with the one clicked
	move.unshift(blankY * 4 + blankX);  //  append some element in the array
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
	return true;
}

function remove() {
	var all = document.getElementsByClassName("each");
	for (var i = 0; i < 16; i++) {
		removeClass(all[i], 'canMove');
	}
}
//  four directions
function addMove() {
	var blank = document.getElementById("blank");
	if (!blank) {
		return;
	}
	var index = getIndex(blank);
	var x = index[0], y = index[1];
	for (var i = 0; i < 4; i++) {
		var end = i % 3 && 3;
		var result = specificPosition(x, y, end, i);
		for (var j in result) {
			addClass(pos[result[j]], 'canMove');
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
	if (direction < 0 || direction > 3) {
		return  null;
	}
	var result = [];
	var addOnX, addOnY;
	if (direction == 0 || direction == 2) {
		addOnX = 0;
		addOnY = (y < end) ? 1: -1;
	} else if (direction == 1||direction == 3) {
		addOnX = (x < end) ? 1: -1;
		addOnY = 0;
	} else {
	}
	while ((addOnX != 0 && x != end)
		|| (addOnY != 0 && y != end)) {
		x += addOnX;
		y += addOnY;
		result.push(y * 4 + x);
		break;
	}
	return result;
}
