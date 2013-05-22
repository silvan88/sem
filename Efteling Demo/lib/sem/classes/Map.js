Map = function() {
	this._map;
	this._mapLocation = {};
	this._mapImage;
	this._mapType = 'roadmap';
	this._GoogleMapsOptions = {
		zoom: 15
	};
	this._poiMarkers = [];
	this._infowindow;
	this._poiList;
	this._poiMarkerOptions = {
		marker: 'default',
		shadow: 'no'
	};
	this._poiOnclick;
}

Map.prototype.renderMap = function(placeholderName) {
	$(".placeholder[name='"+placeholderName+"'] .body").append('<div id="map-canvas" style="height: 100%; width: 100%;"></div>');
	$.getScript("https://maps.google.com/maps/api/js?v=3.12&key=AIzaSyB0CEtmZFuFVvIALuKiXQz1suysUrHCrLU&sensor=false&region=EU&callback=map.initMap");
}
Map.prototype.initMap = function(){
	google.maps.visualRefresh = true;
	
	var $self = this;
	
	if($self._mapLocation.latitude == undefined){
		$.when($self.setLocation()).done(function(){
			say('start building');
			buildMap();
		});
	} else {
		buildMap();
	}
	
	function buildMap(){
		$self.setGoogleMapsOptionsCenter($self._mapLocation);
		$self._GoogleMapsOptions.disableDefaultUI = true;
		$self.setGoogleMapsOptionsMapTypeId($self._mapType);
		$self._map = new google.maps.Map(document.getElementById("map-canvas"), $self._GoogleMapsOptions);
		
		google.maps.event.addListener($self._map, 'click', function() {
			$self._infowindow.close();
		});
		
		$self._infowindow = new google.maps.InfoWindow({
			size: new google.maps.Size(150, 50)
		});
		
		$.each($self._poiList, function(nr, obj){
			$self.createMarker(obj.location.latitude, obj.location.longitude, obj.name, obj.id, $self._poiMarkerOptions);
		});
				
		return $('#map-canvas').height(getWindowSizes().windowHeight);
	}
}

/**
 * Map class. Google maps API intergration.
 * Getters / Settters
 */
Map.prototype.getPoiMarkers = function() {
	return this._poiMarkers;
}
Map.prototype.setPoiMarkers = function(data, onclick) {
	this._poiOnclick = onclick;
	return this._poiList = data.pois;
}
Map.prototype.createMarker = function(latitude, longitude, myTitle, myNum, myIconOptions) {
	var $self = this, contentString = myTitle, latlng = new google.maps.LatLng(latitude, longitude), icon = '';
	
	if(myIconOptions.marker == 'default'){
		myIcon = 'lib/sem/res/map/poi_marker_grey';
	} else {
		myIcon = myIconOptions.marker;
	}
	
	if(myIconOptions.shadow == 'yes'){
		myIcon += '_shadow';
	}
	
	myIcon += '.png';
	
	var marker = new google.maps.Marker({
        position: latlng,
        map: $self._map,
        icon: myIcon,
        zIndex: Math.round(latlng.lat() * -100000) << 5,
        title: myTitle,
		id: myNum
    });

    google.maps.event.addListener(marker, 'click', function() {
        //$self._infowindow.setContent(contentString);
        //$self._infowindow.open($self._map, marker);
		
		$self._poiOnclick(this);
    });

    return $self._poiMarkers.push(marker); //push local var marker into global array
}

Map.prototype.getLocation = function() {
	return this._mapLocation;
}
Map.prototype.setLocation = function(latitude, longitude) {
	var dfd = $.Deferred();
	var $self = this;
	if(latitude == undefined && longitude == undefined){
		$.when($self.setNativeLocation()).done(function(){
			dfd.resolve();
		});
	} else {
		$self._mapLocation.latitude = latitude;
		$self._mapLocation.longitude = longitude;
		dfd.resolve();
	}
	return dfd.promise();
}
Map.prototype.setNativeLocation = function(){
	var $self = this;
	var dfd = $.Deferred();
	var onSuccess = function(position) {
		say('getting location successful');
		$self._mapLocation.latitude = position.coords.latitude;
		$self._mapLocation.longitude = position.coords.longitude;
		dfd.resolve();
	};
	
	function onError(error) {
		showAlert('Error getting location!');
		dfd.resolve();
	};
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	return dfd.promise();
};

Map.prototype.getImage = function() {
	return this._mapImage;
}
Map.prototype.setImage = function(value) {
	return this._mapImage = value;
}

Map.prototype.getGoogleMapsOptions = function() {
	return this._GoogleMapsOptions;
}
Map.prototype.setGoogleMapsOptionsZoom = function(zoom) {
	return this._GoogleMapsOptions.zoom = zoom;
}
Map.prototype.setGoogleMapsOptionsCenter = function(location) {
	gCenter = new google.maps.LatLng(location.latitude, location.longitude)
	return this._GoogleMapsOptions.center = gCenter;
}
Map.prototype.setGoogleMapsOptionsMapTypeId = function(mapType) {
	gMapTypeId = 'google.maps.MapTypeId.'+mapType.toUpperCase();
	return this._GoogleMapsOptions.mapTypeId = eval(gMapTypeId);
}
Map.prototype.setMapType = function(mapType){
	return this._mapType = mapType;
}