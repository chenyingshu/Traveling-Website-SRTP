

$(document).ready(function () {

	// the weather information
	$('#rec-wea-min').weatherfeed(['CHXX0044'],{
		// refresh: true,
		image: true,
		country: true,
		highlow: true,
		wind: true,
		humidity: true,
		visibility: true,
		sunrise: true,
		sunset: true,
		forecast: true,
		link: false
	});

	$("#btn1").click(function(){
		$('#test2').load('text/test.txt')
	});

	//the uploadcare API and the face recognition
	$("#rec-face>img").click(function(){
		//the trigger button
		$(this).attr({
			'src': '/images/rec-face-but-no-heart.png',
		});
		//show the uploadcare part
		$("#rec-choose-button").slideToggle("slow");
		$("#rec-result").slideToggle("slow");
		
		//avoid the repetion of adding the div
		if($("#rec-get-face").length == 0){
			var rec_get_face = $("<button></button>");
			rec_get_face.html('get the face information');
			// rec_get_face.addClass("btn btn-primary");
			rec_get_face.attr({
				"display": "block",
				"id": "rec-get-face",
			});
			// get the face recognition informaiotn returned fron the face++
			rec_get_face.bind("click", function(){
				console.log("Here I am in the callback");
				var output = $.ajax({
					// The URL to the API. 
					url: detUrl, 
					// The HTTP Method, can be GET POST PUT DELETE etc
					type: 'GET', 
					// Additional parameters here
					data: {}, 
					datatype: 'json',
					success: function(data) {
						if(!data.face[0])
						{
							alert("Please Choose Another Picture");
							console.log(data.face[0]);
						}
						else
						{
							console.log(data);
							$("#rec-result-face").css("display", "block");
							// $("#rec-result-face>ul").attr("display", "block");
						document.getElementById("age").innerHTML = "年龄： " + data.face[0].attribute.age.value ; 
						document.getElementById("gender").innerHTML = "性别： " + data.face[0].attribute.gender.value ; 
						document.getElementById("glass").innerHTML = "眼镜： " + data.face[0].attribute.glass.value ; 
						document.getElementById("race").innerHTML = "种族： " + data.face[0].attribute.race.value ; 
						document.getElementById("smile").innerHTML = "心情： " + data.face[0].attribute.smiling.value;
							console.log(data.face[0].attribute.smiling.value);
						// document.getElementById('myform').submit();
						}
					},
					error: function(err) { 
						// alert("Press 'Recommend Music' Button Again,Please"); 
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("X-Mashape-Authorization", 
						"ufTs73UBiwmshkIdPP5R8xllsgOqp1dR1F7jsnxGM257o9GJh8"); // Enter here your Mashape key	
					}		
		  		});
			});
			$("#rec-choose-button").append(rec_get_face);
		}
	});

	var detUrl = "hello hello";
	console.log(detUrl);
	//add the uploadcare widget
	var widget = uploadcare.Widget('[role=uploadcare-uploader]');
	// get the URL when uploadign is completed.
	widget.onUploadComplete(function(fileInfo) {
	  	var nUrl = encodeURIComponent(fileInfo.cdnUrl);
		nUrl = nUrl + " ";
	    console.log(fileInfo.cdnUrl);
		detUrl = "https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=glass%2Cpose%2Cgender%2Cage%2Crace%2Csmiling&url=" + nUrl;
		console.log(detUrl); 
		var result_image = $("<img>").attr("src", fileInfo.cdnUrl);
		$('#rec-result-image').append(result_image);
	});


	







//the map information
// 初始化地图，设置中心点坐标和地图级别
var map = new BMap.Map("rec-map");          // 创建地图实例  
var point = new BMap.Point(116.404, 39.915);  // 创建点坐标 
map.centerAndZoom("杭州", 15);  
map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
// map.setCurrentCity("杭州"); // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

// 添加带有定位的导航控件
var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
});
map.addControl(navigationControl);

// 添加定位控件
var geolocationControl = new BMap.GeolocationControl();
geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
});
geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
});
map.addControl(geolocationControl);

//覆盖区域图层测试
// map.addTileLayer(new BMap.PanoramaCoverageLayer());

var stCtrl = new BMap.PanoramaControl(); //构造全景控件
stCtrl.setOffset(new BMap.Size(20, 20));
map.addControl(stCtrl);//添加全景控件

//改变地图风格
map.setMapStyle({style:'bluish'});


// 创建地址解析器实例并填入地址，
var index = 0;
var myGeo = new BMap.Geocoder();
var adds = [
	"曲院风荷",
	"三台山茶楼",
	"三台山云水"
	];
var address = new Array;
var opts = {
			width : 250,     // 信息窗口宽度
			height: 80,     // 信息窗口高度
			title : "信息窗口" , // 信息窗口标题
			enableMessage:true//设置允许信息窗发送短息
		   };


function bdGEO(){
	var add = adds[index];
	geocodeSearch(add);
	console.log("index in bdGEO" + index);
	index++;
}

function geocodeSearch(add){
	console.log("in the geocodesearch"+ index);
	if(index < adds.length){
		setTimeout(bdGEO,600);
		console.log("index smaller than length"+index);
	} 
	myGeo.getPoint(add, function(point){
		console.log("getpoints"+ point + "index" + index);
		if (point) {
			document.getElementById("marker-result").innerHTML +=  index + "、" + add + ":" + point.lng + "," + point.lat + "</br>";
			address[index] = new BMap.Point(point.lng, point.lat);
			console.log("this is the address" + address[index]);
			map.panTo(address[index]); 
			console.log("index is 1");				
			// addMarker(address,new BMap.Label(index+":"+add,{offset:new BMap.Size(20,-10)}));
			addMarker(address[index],add);
		}else{
			map.setZoom(14);
			// var polyline = new BMap.Polyline([address[0],address[1],address[2]], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
			// map.addOverlay(polyline);
			console.log('!!!!!!!!!!!!!!!!!!!!!');
			console.log('this is the address:' + address[1].lng);
		}
	}, "杭州市");
}

// 编写自定义函数,创建标注
function addMarker(point, add){
	var marker = new BMap.Marker(point);
	console.log("index in addmaker " + index);
	map.addOverlay(marker);
	// marker.setLabel(label);
	var infoWindow = new BMap.InfoWindow(add,opts);  // 创建信息窗口对象 
	marker.addEventListener("click", function(){

			// var infoWindow = new BMap.InfoWindow(add,opts);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,point); //开启信息窗口
	})
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

	
}

$("#rec-map-result>input").on("click",bdGEO);

});


