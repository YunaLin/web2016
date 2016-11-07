var isLose = null;
var isCheat = false;
window.onload=function() {
	// to make it remove "change" at the beginning.
	var str = document.getElementById("status").innerHTML;
	if (str == "Move your mouse over the \"S\" to begin.") {
		var all = document.querySelectorAll("div#maze div.boundary");
		for (var count = 0; count < 5; count++)
			all[count].classList.remove("change");
	}
	document.getElementById("start").onmouseover = start;
	document.getElementById("end").onmouseover = end;
	document.getElementById("maze").onmouseleave = function() {
		isCheat = true;
		var all = document.querySelectorAll("div#maze div.boundary");
		for (var count = 0; count < all.length; ++count)
			all[count].classList.remove("change");
	}
	var all = document.querySelectorAll("div#maze div.boundary");
	for (var count = 0; count < all.length; count++) {
		all[count].onmouseover = lose;
	}
};
function lose(event) {
	if (isLose == false) {
		// It took a lot time to make only one wall change red. Use "event.target"!
		event.target.classList.add("change");
		document.getElementById("status").innerHTML = "You Hit The Wall ! You lose !";
		isLose = true;
	} 
}
//  If cheat, by move out of the path and through the empty body
//function cheatOver(event) {
	// if (isLose == false && event.target == document.body) {
	// 	var all = document.querySelectorAll("div#maze div.boundary");
	// 	for (var count = 0; count < 5; ++count)
	// 		all[count].classList.add("change");
	// 	document.getElementById("status").innerHTML = "You Cheat ! You Lose !";
	// }
// }
//  start
function start() {
	isCheat = false;
	var all = document.querySelectorAll("div#maze div.boundary");
		for(var count = 0; count < all.length; count++) {
			all[count].classList.remove("change");
		}
	document.getElementById("status").innerHTML = "Move your mouse over the \"S\" to begin.";
	isLose = false;
}
//  end
function end() {
	if (isLose == false) {
		if (isCheat == false)
			document.getElementById("status").innerHTML = "You Win ! Congratulations !";
		else 
			document.getElementById("status").innerHTML = "You Cheat ! You Lose !";
	}
	isLose = null;
	isCheat = false;
}