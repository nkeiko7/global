var shops;
var activeMarker = null;
var gMapMarkers = new Array();
var gSelfMarker = null;
var gBLoadFirstTime = true;
var gBLoadList = true;
var map = null;

var MAP_LIMIT_SHOPLIST = 10; /* 一覧表示する最大の店舗数 */
var MAP_LIMIT_MARKER = 100; /* マップ上に配置する最大の店舗数 */
var MAP_IMG_MARKER = "/img/marker_red_default.png";
var MAP_IMG_SELF_POS = "/img/self_position.png";
var MAP_MARKER_LINK_URL = "http://www.muji.com/storelocator/?c=gl&lang=LC&header=gl";
var MAP_SHOPLIST_JSON_URL = "http://www.muji.com/storelocator/?c=gl&lang=LC&_ACTION=_SEARCH";
var MAP_DEFAULT_ZOOM = 12;
var MAP_DEFAULT_LAT = 35.675858;
var MAP_DEFAULT_LON = 139.765153;
var MAP_LOAD_DIV_ID = "map";


$(function() {
	// 表示初期化
	$("#shoplist").find("ul:first").hide();
	$("#noshops").hide();
	$("#overlimit").hide();
	$("#map").removeClass("getGeolocation");
	$("#shoplist").removeClass("getGeolocation");
	$("#nearbyTitle").removeClass("getGeolocation");

	// マップをロード
	var mapOptions = {
		zoom: MAP_DEFAULT_ZOOM,
		center: new google.maps.LatLng(MAP_DEFAULT_LAT, MAP_DEFAULT_LON), // デフォルトは有楽町
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_TOP
		},
		panControlOptions: {
			position: google.maps.ControlPosition.RIGHT_TOP
		},
		streetViewControl: false,
		mapTypeControl: false
	};
	map = new google.maps.Map(document.getElementById(MAP_LOAD_DIV_ID), mapOptions);

	// 初期表示: 初期は現在位置を取得
	google.maps.event.addListenerOnce(map, 'idle', searchNearBy);

	// その他イベントを紐づけ
	google.maps.event.addListener(map, 'zoom_changed', function(){
		if (activeMarker) activeMarker.remove();
	});
	google.maps.event.addListener(map, 'center_changed', function(){
		if (activeMarker) activeMarker.remove();
	});
	google.maps.event.addListener(map, 'drag', function(){
		if (activeMarker) activeMarker.remove();
	});
});

function searchNearBy () {
	var selfLocation = null;
	var geolocation;
	
	// 位置情報を許可・拒否判定中もピンを表示できるよう予め範囲内検索を行うよう設定
	searchByBounds();
	google.maps.event.addListener(map, 'idle', searchByBounds);
	
	// geolocationオブジェクトを生成
	try {
		geolocation = navigator.geolocation;
	} catch(e) {}
	if (!geolocation) {
		//if (alertflg) alert("The geolocator function is not supported by your browser.\nPlease use other search methods.");
		$("#shoplist").find("ul:first").hide();
		$("#noshops").hide();
		$("#overlimit").hide();
		return null;
	}

	// 位置情報取得時に設定するオプション
	var option = {
		enableHighAccuracy: true,
		timeout : 10000, 
		maximumAge: 0
	};  

	// 現在位置を1回のみ取得
	geolocation.getCurrentPosition(
		// success
		function(position) {
			selfLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			
			// 店舗リストを取得できたら、地図のサイズを変更する
			$("#map").addClass("getGeolocation");
			$("#shoplist").addClass("getGeolocation");
			$("#mapMask").addClass("getGeolocation");
		
			gBLoadFirstTime = true;
			
			// マップをロード
			var mapOptions = {
				zoom: map.getZoom(),
				center: selfLocation, 
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				panControl: false,
				zoomControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_TOP
				},
				panControlOptions: {
					position: google.maps.ControlPosition.RIGHT_TOP
				},
				streetViewControl: false,
				mapTypeControl: false
			};
			map = new google.maps.Map(document.getElementById(MAP_LOAD_DIV_ID), mapOptions);
		
			// 初期表示: 初期は現在位置を取得
			google.maps.event.addListener(map, 'idle', searchByBounds);
		
			// その他イベントを紐づけ
			google.maps.event.addListener(map, 'zoom_changed', function(){
				if (activeMarker) activeMarker.remove();
			});
			google.maps.event.addListener(map, 'center_changed', function(){
				if (activeMarker) activeMarker.remove();
			});
			google.maps.event.addListener(map, 'drag', function(){
				if (activeMarker) activeMarker.remove();
			});
	
	
			if ( gSelfMarker )
			{
				// 一旦削除
				gSelfMarker.setMap(null);
				delete gSelfMarker;
			}
			// 現在地マーカー配置
			var image = new google.maps.MarkerImage(
				MAP_IMG_SELF_POS,
				null, // サイズ
				null, // 起点
				new google.maps.Point( 8, 8 ), // マーカー画像の配置場所（中央）
				new google.maps.Size( 17, 17 ) // スケール
			);

			gSelfMarker = new google.maps.Marker(
			{
				flat: true, // 影なし
				icon: image,
				map: map,
				optimized: false,
				position: selfLocation,
				title: 'current',
				visible: true
			});


	
			
			map.setCenter( selfLocation );
			
			// 現在位置取得時のみリスト表示させる
			gBLoadList = false;
		},
		// error
		function(e)
		{
			$("#shoplist").find("ul:first").hide();
			$("#noshops").hide();
			$("#overlimit").hide();
			//if (alertflg) alert("The geolocator function is not supported by your browser.\nPlease use other search methods.");
		}
		, option
	);

	return selfLocation;
}

function searchByBounds (){
	var bLoopExec = true;
	while (bLoopExec) {
		var latlngBounds = map.getBounds();
		if(typeof latlngBounds == "undefined") return false;

		var swLatlng = latlngBounds.getSouthWest();
		var neLatlng = latlngBounds.getNorthEast();

		var param = "&swLat=" + swLatlng.lat() + "&swLng=" + swLatlng.lng() + "&neLat=" + neLatlng.lat() + "&neLng=" + neLatlng.lng();

		shops = eval($.ajax({
			type: 'GET',
			url: MAP_SHOPLIST_JSON_URL + param,
			dataType: 'json',
			async: false
		}).responseText);

		if (gBLoadFirstTime) {
			if (shops.length == 0) {
				// ズームアウト
				map.setZoom(map.getZoom() - 1);
				if (map.getZoom() <= 1) {
					gBLoadFirstTime = false;
					bLoopExec = false;
				}
			} else if (shops.length > 10) {
				// ズームイン
				map.setZoom(map.getZoom() + 1);
				if (map.getZoom() > 16) {
					gBLoadFirstTime = false;
					bLoopExec = false;
				}
			} else {
				gBLoadFirstTime = false;
				bLoopExec = false;
			}
		} else {
			bLoopExec = false;
		}
	}
	
	refreshMarkers();
	return true;
}

function refreshMarkers () {
	// クエリ実行済みの場合のみ動作
	if (!shops) return false;

	//==============================
	// マーカー・店舗詳細クリア
	//==============================
	//表示中のマーカーがあれば削除
	if(gMapMarkers.length > 0){
		//マーカー削除
		for (var i = 0; i <  gMapMarkers.length; i++) {
			gMapMarkers[i].setMap(null);
			delete gMapMarkers[i];
		}
		gMapMarkers = new Array();
	}
	var shoplist = $("#shoplist").find("ul:first");
	//shoplist.empty();

	//==============================
	// マーカー・店舗詳細生成
	// （クエリ取得済みshopsグローバル変数から生成）
	//==============================
	var noshops = $("#noshops");
	var overlimit = $("#overlimit");
	var len = shops.length;
	var shoplist_count = 0;
	var marker_count = 0;

	noshops.hide();
	shoplist.show();
	overlimit.hide();

	for(var i = 0; i < len; i++){
		// 店舗一覧用HTML作成
		if (shoplist_count < MAP_LIMIT_SHOPLIST && !gBLoadList) {
			var li = $("<li />").addClass("entry");

			var forhover = $("<div />").addClass("forhover");
			var shopid = $("<div />").addClass("shopid").text(shops[i].shopid);
			var anchor = $("<a />").attr("href", MAP_MARKER_LINK_URL + "#" + shops[i].shopid);
			var shopname = $("<div />").addClass("shopname").text(shops[i].shopname);
			var address = $("<div />").addClass("address").text(shops[i].shopaddress);
			var opentime = $("<div />").addClass("opentime").text(shops[i].opentime);

			anchor.append(shopname);
			forhover.append(anchor).append(address).append(opentime);
			li.append(shopid).append(forhover);
			shoplist.append(li);

			shoplist_count++;
		}

		// マーカーの地図上への配置
		var marker;
		if (marker_count < MAP_LIMIT_MARKER) {
			// 全マーカーを対象に配置
			marker = createMarker(map, shops[i].latitude, shops[i].longitude, shops[i].shopid, shops[i].shopname);
			gMapMarkers.push(marker);
			marker_count++;
		}

	} // end for
	
	// もし１件も絞り込みに該当する店舗が存在しない場合は、該当なしを表示する。
	if ( shoplist_count == 0 ) {
		noshops.show();
		//shoplist.hide();
		overlimit.hide();
		
	} else if (shoplist_count >= MAP_LIMIT_MARKER) {
		noshops.hide();
		//shoplist.show();
		overlimit.show();
	}
	


	gBLoadList = true;
	return true;
}

function createMarker(map, lat, lng, shopid, shopname){

	var image = new google.maps.MarkerImage(
		MAP_IMG_MARKER, 
		null, // サイズ
		null, // 起点
		new google.maps.Point( 17, 42 ), // マーカー画像の配置場所（中央）
		new google.maps.Size( 33, 42 ) // スケール
	);

	marker = new google.maps.Marker({
		flat: true, // 影なし
		icon: image,
		map: map,
		position: new google.maps.LatLng(lat, lng),
		title: shopid + ':' + shopname,
		visible: true
	});

	google.maps.event.addListener(marker, 'click', function(mouseEvt){
		// クリックしたマーカーに移動
		map.setCenter(mouseEvt.latLng);
		map.setZoom(16);

		// 表示済アクティブマーカーを削除
		if (activeMarker) activeMarker.remove();

		// projectin取得
		projection = map.getProjection();

		// クリックされたマーカーの緯度経度を世界座標に変換
		var latLngChoord = projection.fromLatLngToPoint(mouseEvt.latLng);

		// 地図領域の左上を世界座標に変換
		var bounds = map.getBounds();
		var nwChoord = projection.fromLatLngToPoint(new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng()));

		// 地図領域左上からマーカーまでのピクセルを求める
		var world = Math.pow(2, map.getZoom()); 
		var x = (latLngChoord.x - nwChoord.x)  * world;
		var y = (latLngChoord.y - nwChoord.y)  * world;

		// マーカーのDOMを生成し、offset無しで地図領域に追加
		title = this.title.split(":"); // 0:shpid(店舗詳細リンク用) 1:shopname
		activeMarker = _createCustomMarkerDom(this.position.lat(), this.position.lng(), title[0], title[1]);
		activeMarker.css("left",x).css("top",y);
		activeMarker.find(".markerimg").css({display: "none"});
		activeMarker.find(".markerwithname").css({display: "block"});
		$("#map").append(activeMarker);

	});
	return marker;
}

function _createCustomMarkerDom(lat, lng, shopid, shopname){
	var marker = $("<div />").addClass("marker").addClass("current");
	var markerid = $("<span />").addClass("markerid").text(shopid);
	var markerlat = $("<span />").addClass("markerlat").text(lat);
	var markerlng = $("<span />").addClass("markerlng").text(lng);
	var markerimg = $("<div />").addClass("markerimage");
	var markerwithname = $("<div />").addClass("markerwithname");
	var markerleft = $("<div />").addClass("markerleft");
	var markerrepeat= $("<div />").addClass("markerrepeat").text(shopname);
	markerwithname.css({width: shopname.length * 15 + 25 + 29, display: "none"});
	var markerright = $("<div />").addClass("markerright");
	markerwithname.html(markerleft);
	markerwithname.append(markerrepeat);
	markerwithname.append(markerright);

	marker.html(markerimg);
	marker.append(markerwithname);
	markerimg.css({display: "none"});
	marker.append(markerid);
	marker.append(markerlat);
	marker.append(markerlng);

	marker.on('click', function(){
		// マーカーから店舗コードを取得
		var shopid_clicked = $(this).find(".markerid").text();

		// 万一店舗コードを取得できない場合は処理を中断
		if (!shopid_clicked) return; 

		// 店名表示済マーカーがクリックされていたら詳細ページを表示
		if($(this).find(".markerwithname").css('display') != 'none'){
			location.href = MAP_MARKER_LINK_URL + "#" + shopid_clicked;
		}
	});

	return marker;
}
