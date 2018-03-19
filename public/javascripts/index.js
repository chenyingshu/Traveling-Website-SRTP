$(document).ready(function () {
	$(window).load(function(){
		$("#cover").height($("#movie").height());
	});
	$(window).resize(function(){
		$("#cover").height($("#movie").height());
	});
});
