$(document).ready(function() {
	var flag = 1;
	var that = null;
	//  sort todo 
	$("#todo thead tr th").click(function() {
		var tIndex = parseInt($(this).index());
		if (that == null) that = tIndex;
		if (that != tIndex) {
			$("#todo thead tr th").eq(that).removeClass("changeColor");
			that = tIndex;
		}
		var value = new Array();
		valueStorageTo_todo(value, tIndex);
		mySort(this, value);
		resetValueTo_todo(value, tIndex);	
	});

	function valueStorageTo_todo(value, tIndex) {
		var len = $("#todo tbody tr").length;
		for (var i = 0; i < len; ++i) {
			value[i] = $("#todo tbody tr:eq("+i+") td").eq(tIndex).html();
		}
	}

	function mySort(obj, value) {
		if (flag == 1) {
			$(obj).addClass("changeColor changeImage");
			value.sort(function(a,b){ return a > b ? -1:1});
			flag = 2;
		} else {
			$(obj).removeClass("changeImage");
			value.sort(function(a,b){ return a > b ? 1:-1});
			flag = 1;
		}
	}

	function resetValueTo_todo(value, tIndex) {
		$("<div class='temporary'></div>").appendTo("body");
		for (var i = 0; i < value.length; ++i) {
			for (var j = 0; j < $("#todo tbody tr").length; j++) {
				var text = $("#todo tbody tr:eq("+j+") td").eq(tIndex).html();
				if (value[i] == text) {
					$("#todo tbody tr").eq(j).clone().appendTo(".temporary");
				}   
			}
		}
		$("#todo tbody").html("");
		$("#todo tbody").append($(".temporary").html());
		$(".temporary").html("");
	}
	//  sort staff
	$("#staff thead tr th").click(function() {
		var tIndex = parseInt($(this).index());
		if (that == null) that = tIndex;
		if (that != tIndex) {
			$("#staff thead tr th").eq(that).removeClass("changeColor");
			that = tIndex;
		}
		var value = new Array();
		valueStorageTo_staff(value, tIndex);
		mySort(this, value);
		resetValueTo_staff(value, tIndex);
	});

	function valueStorageTo_staff(value, tIndex) {
		var len = $("#staff tbody tr").length;
		for (var i = 0; i < len; ++i) {
			value[i] = $("#staff tbody tr:eq("+i+") td").eq(tIndex).html();
		}
	}
	
	function resetValueTo_staff(value, tIndex) {
		$("<div class='temporary'></div>").appendTo("body");
		for (var i = 0; i < value.length; ++i) {
			for (var j = 0; j < $("#staff tbody tr").length; j++) {
				var text = $("#staff tbody tr:eq("+j+") td").eq(tIndex).html();
				if (value[i] == text) {
					$("#staff tbody tr").eq(j).clone().appendTo(".temporary");   //  ? appendTo
				}   
			}
		}
		$("#staff tbody").html("");
		$("#staff tbody").append($(".temporary").html());
		$(".temporary").html("");
	}
});