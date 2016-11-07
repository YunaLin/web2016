var playing = false;
var timeDecrease = 30;
var score = 0;
var timeId = null;
var sameRandom = -1;  //  to avoid create the num that is the same as its last one
var randomNum;

window.onload=function() {
	//  If playing is false, click on the startOrStop button to start
	// else click to stop
	document.getElementById("startOrStop").onclick=function() {
		if (playing == false) {
			start();
		} else {
			stopTime();
			document.getElementById("status").value = "Stop";
		}
	}
	//  createElement for mole
	for (var count = 0; count < 60; ++count) {
		var toAdd = document.createElement("div");
		toAdd.className = "disappear";
	    document.getElementById("mole").appendChild(toAdd);
	    toAdd.onclick=calculate;
	}
}
//  start the game
function start(event) {
		playing = true;
		startTime();
		document.getElementById("status").value = "Playing";
		createRandomNum();
}
// create random number. I am still confused that when create the num 0, it stops
function createRandomNum() {
	randomNum = Math.floor(Math.random()*60);
	while (sameRandom == randomNum || randomNum == 0) {
		randomNum = Math.floor(Math.random()*60);
	}
	sameRandom = randomNum;
	document.getElementById("mole").childNodes[randomNum].className = "appear";
}
//  increase or decrease the score
function calculate(event) {
	if (playing == true) {
		if (event.target.className=="appear") {
			score++;
			document.getElementById("score").value = score;
			event.target.className="disappear";
			createRandomNum();
		} else {
			if (score > 0)
				score--;
			document.getElementById("score").value = score;
		}
	} else {
		alert("click the start button first please");
	}
}
// start time
function startTime(event) {
	if (timeId == null)
		timeId = setInterval(showTime, 1000);  //  showtime为要执行的代码段，1000ms=1s，即每秒更新一次
}
function showTime() {
	timeDecrease = timeDecrease - 1;
	document.getElementById("time").value = timeDecrease;
	if (timeDecrease == 0) {
		gameOver();
	}
}
//  clearInterval when stop and make all mouse disappear, 
//  otherwise there will be two random num at the same time when you click the start
function stopTime(event) {
	clearInterval(timeId);
	playing = false;
	timeId = null;
	sameRandom = -1;
	for (var count = 0; count < 60; count++)
		document.getElementById("mole").childNodes[count].className = "disappear";
}
//  initialize all the number the same as at the beginning
function gameOver() {
	if (playing == true) {
		clearInterval(timeId);
		alert("Game Over!\n Your score:" + score);
		for (var count = 0; count < 60; count++)
			document.getElementById("mole").childNodes[count].className = "disappear";
		playing = false;
		score = 0;
		timeDecrease = 30;
		timeId = null;
		sameRandom = -1;
		document.getElementById("status").value = "Game Over!";
	}
}