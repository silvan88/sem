Map = function() {
	this._location = {};
	this._image;
	this._GoogleMapsOptions = {
		zoom: 15
	};
}

Map.prototype.initMap = function(){
	var $self = this;
	if($self._location.latitude == undefined){
		$.when($self.setLocation()).done(function(){
			say('start building');
			buildMap();
		});
	}
	
	function buildMap(){
		$self.setGoogleMapsOptionsCenter($self._location);
		$self._GoogleMapsOptions.disableDefaultUI = true;
		$self.setGoogleMapsOptionsMapTypeId('roadmap');
		var map = new google.maps.Map(document.getElementById("map-canvas"), $self._GoogleMapsOptions);
		var deviceHeight = screen.height;
		
		return $('#map-canvas').height(deviceHeight);
	}
}

Map.prototype.setNativeLocation = function(){
	var $self = this;
	var dfd = $.Deferred();
	var onSuccess = function(position) {
		say('getting location successful');
		$self._location.latitude = position.coords.latitude;
		$self._location.longitude = position.coords.longitude;
		dfd.resolve();
	};
	
	function onError(error) {
		sem.showAlert('Error getting location!');
		dfd.resolve();
	};
	
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	return dfd.promise();
};

Map.prototype.renderMap = function(placeholderName) {
	$(".placeholder[name='"+placeholderName+"'] .body").append('<div id="map-canvas" style="height: 100%; width: 100%;"></div>');
	$.getScript("https://maps.google.com/maps/api/js?key=AIzaSyB0CEtmZFuFVvIALuKiXQz1suysUrHCrLU&sensor=false&callback=map.initMap");
}

/**
 * Map class. Google maps API intergration.
 * Getters / Settters
 */
Map.prototype.getLocation = function() {
	return this._location;
}
Map.prototype.setLocation = function(latitude, longitude) {
	var dfd = $.Deferred();
	var $self = this;
	if(latitude == undefined && longitude == undefined){
		$.when($self.setNativeLocation()).done(function(){
			dfd.resolve();
		});
	} else {
		$self._location.latitude = latitude;
		$self._location.longitude = longitude;
		dfd.resolve();
	}
	return dfd.promise();
}

Map.prototype.getImage = function() {
	return this._image;
}
Map.prototype.setImage = function(value) {
	return this._image = value;
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