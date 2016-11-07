// 未解决：html中使用了onclick
// 用chrome打开界面的整体px设置会比较好，用firefox打开的话界面的px可能有些小的不足
// 基本思路是递归
// 每次通过运算符将字符串划分为左字符串和右字符串
var isPressEqualsKey = false;
var result;
var content = "";
var txt = "";

// 将控件值赋给数值输入框中
function connectContent(control) {
	content = document.getElementById('txtScreen');
	if(isPressEqualsKey) { 
		content.value = ""; //已进行过计算，则清空数值输入框重新开始
		isPressEqualsKey = false;
	}
	if (control.value == "<-" && content.value.length > 0) {
		var str = content.value;
		content.value = str.substring(0, str.length - 1);
		return true;
	}
	if (control.value == "CE") {
		content.value = "0";
		return false;
	}
	if (control.value == "=") {
		txt = content.value;
		if (!isValid(txt)) {
			alert("Wrong expression");
			return false;
		} else {
			content.value = calculate(txt);
			return true;
		}
	}
	if (content.value.length == 1 && content.value == "0" && control.value != ".") content.value = control.value;
	else content.value += control.value; //将控件值赋给数值输入框中
}


function isOperator(value) {
	var operatorString = "+-*/()";
	return operatorString.indexOf(value) > -1
}


function isOperand(value) {
	var operandString = "0123456789";
	return operandString.indexOf(value) > -1;
}

function isValid(txt) {
	var temp = "";
	var n = txt.length;
	// 非法字符
	for (var i = 0; i < n; ++i) {
		if (!isOperand(txt[i]) && !isOperator(txt[i]) && txt[i] != ".")
			return false;
	}
	//  括号匹配S
	var count1 = 0;
	var count2 = 0;
	for (var count = 0; count < n; ++count) {
		if (txt[i] == "(") count1 += 1;
		if (txt[i] == ")") count2 += 1;
	}
	if (count1 != count2) return false;

	// 如果全部是数字
	count1 = 0;
	for (var i = 0; i < n; ++i) {
		if (isOperand(txt[i]))
			count1++;
	}
	if (count1 == n) return false;
	for (var i = 0; i < n; ++i) {
		// 第一个字符是.
		if (txt[0] == ".") return false;
		// .的前面或者是后面不是数字
		if (txt[i] == "." && (!isOperand(txt[i - 1]) || !isOperand(txt[i + 1])))
			return false;
		//  被除数为0
		if ((txt[i] == "/" || txt[i] == "%") && txt[i + 1] == "0" && txt[i + 2] != ".")
			return false;
		//  第一个字符不是数字且不是（或者是-
		if (isOperator(txt[0]) && txt[0] != "-" && txt[0] != "(") return false;
		// 如果操作符号前后不是数字（两个括号的情况特殊处理）
		if (isOperator(txt[i])) {
			if (txt[i] == "(" && i != 0) {
				if (!isOperator(txt[i - 1])) return false;
				if (!isOperand(txt[i + 1])) return false;
			} else if (txt[i] == ")" && i != n - 1) {
				if (!isOperand(txt[i - 1])) return false;
				if (!isOperator(txt[i + 1])) return false;
			}
		}
	}
	return true;
}

function canCalDirect(subtxt) {
	var indexOfAdd = subtxt.indexOf("+");
	var indexOfMinus = subtxt.indexOf("-");
	var indexOfMul = subtxt.indexOf("*");
	var indexOfDivide = subtxt.indexOf("/");
	var indexOfMol = subtxt.indexOf("%");
	if (indexOfAdd < 0 && indexOfMinus < 0 && indexOfMul < 0 &&
		indexOfDivide < 0 && indexOfMol < 0) {
		return true;
	} else {
		return false;
	}
}

// 优先级的处理是通过将加法和减法的运算放在乘法等其他的优先级较高的前
// 面，相当于实现了加法和减法后进行运算
function calculate(txt) {
	// ()的处理
	var sum;
	var index = txt.lastIndexOf("(");
	if (index > -1) {
		var endIndex = txt.indexOf(")", index);
		if (endIndex > -1) {
			sum = calculate(txt.substring(index + 1, endIndex));
			var str = txt.substring(0, index) + sum + txt.substring(endIndex + 1);
			return calculate(str);
		}
	}
	//  加法
	index = txt.indexOf("+");
	left = txt.substring(0, index);
	right = txt.substring(index + 1);
	if (index > -1) {	
		if (canCalDirect(left) && canCalDirect(right)) {
		    sum = parseFloat(left) + parseFloat(right);
			return sum;
		} else if (canCalDirect(left) && !canCalDirect(right)) {
			return parseFloat(left) + calculate(right);
		} else if (!canCalDirect(left) && canCalDirect(right)) {
			return calculate(left) + parseFloat(right);
		} else {
			return calculate(left) + calculate(right);
		}
	}
	// 减法
	index = txt.indexOf("-");
	left = txt.substring(0, index);
	right = txt.substring(index + 1);
	if (index > -1) {	
		if (canCalDirect(left) && canCalDirect(right)) {
		    sum = parseFloat(left) - parseFloat(right);
			return sum;
		} else if (canCalDirect(left) && !canCalDirect(right)) {
			return parseFloat(left) - calculate(right);
		} else if (!canCalDirect(left) && canCalDirect(right)) {
			return calculate(left) - parseFloat(right);
		} else {
			return calculate(left) - calculate(right);
		}
	}
	// 乘法
	index = txt.indexOf("*");
	var left = txt.substring(0, index);
	var right = txt.substring(index + 1);
	if (index > -1) {	
		if (canCalDirect(left) && canCalDirect(right)) {
		    sum = Number(left) * Number(right);
			return sum;
		} else if (canCalDirect(left) && !canCalDirect(right)) {
			return Number(left) * calculate(right);
		} else if (!canCalDirect(left) && canCalDirect(right)) {
			return calculate(left) * Number(right);
		} else {
			return calculate(left) * calculate(right);
		}
	}
	// 除法
	index = txt.lastIndexOf("/");
	left = txt.substring(0, index);
	right = txt.substring(index + 1);
	if (index > -1) {	
		if (canCalDirect(left) && canCalDirect(right)) {
		    sum = parseFloat(left) / parseFloat(right);
			return sum;
		} else if (canCalDirect(left) && !canCalDirect(right)) {
			return parseFloat(left) / calculate(right);
		} else if (!canCalDirect(left) && canCalDirect(right)) {
			return calculate(left) / parseFloat(right);
		} else {
			return calculate(left) / calculate(right);
		}
	}
	// 取模
	index = txt.indexOf("%");
	left = txt.substring(0, index);
	right = txt.substring(index + 1);
	if (index > -1) {	
		if (canCalDirect(left) && canCalDirect(right)) {
		    sum = parseFloat(left) - parseFloat(right);
			return sum;
		} else if (canCalDirect(left) && !canCalDirect(right)) {
			return parseFloat(left) % calculate(right);
		} else if (!canCalDirect(left) && canCalDirect(right)) {
			return calculate(left) % parseFloat(right);
		} else {
			return calculate(left) % calculate(right);
		}
	}
}
