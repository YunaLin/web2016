// 神奇的jQuery！
var myMouse = { playing:false, timeDecrease:30, score:0, timeId:null, sameRandom:-1, randomNum:0 }
//  If myMouse.playing is false, click on the startOrStop button to start else click to stop
window.onload=function() {
	$("#startOrStop").click(function() {
		if (myMouse.playing == false) {
			start();
		} else {
			stopTime();
			$("#status").val("stop");
		}
	});
	for (var count = 0; count < 60; ++count)
		$("<div class='disappear'></div>").appendTo("#mole");
	$(".disappear").click(function() {
	   	calculate(this);
	});
}
function start(event) {
		myMouse.playing = true;
		startTime();
		$("#status").val("Playing");
		createrandomNum();
}
// create random number. I am still confused that when create the num 0, it stops
function createrandomNum() {
	myMouse.randomNum = Math.floor(Math.random()*60);
	while (myMouse.sameRandom == myMouse.randomNum || myMouse.randomNum == 0) {
		myMouse.randomNum = Math.floor(Math.random()*60);
	}
	myMouse.sameRandom = myMouse.randomNum;
	$("#mole div").eq(myMouse.randomNum).removeClass("disappear").addClass("appear");
}
//  increase or decrease the myMouse.score
function calculate(obj) {
	if (myMouse.playing == true) {
		if (obj.className=="appear") {
			$("#score").val(++myMouse.score);
			obj.className="disappear";
			createrandomNum();
		} else {
			if (myMouse.score > 0) myMouse.score--;
			$("#score").val(myMouse.score);
		}
	} else {
		alert("click the start button first please");
	}
}
// start time
function startTime(event) {
	if (myMouse.timeId == null)
		myMouse.timeId = setInterval(function() {
			$("#time").val(--myMouse.timeDecrease);
			if (myMouse.timeDecrease == 0)
				gameOver(); }, 1000);
}
//  clearInterval when stop and make all mouse disappear, otherwise there will be two random num at the same time when you click the start
function stopTime(event) {
	clearInterval(myMouse.timeId);
	myMouse.playing = false;
	myMouse.timeId = null;
	myMouse.sameRandom = -1;
	$("#mole div").removeClass("appear").addClass("disappear");
}
function gameOver() {
	if (myMouse.playing == true) {
		clearInterval(myMouse.timeId);
		alert("Game Over!\n Your myMouse.score:" + myMouse.score);
		$("#mole div").removeClass("appear").addClass("disappear");
		myMouse.playing = false;
		myMouse.score = 0;
		myMouse.timeDecrease = 30;
		myMouse.timeId = null;
		myMouse.sameRandom = -1;
		$("#status").val("Game Over!");
	}
}