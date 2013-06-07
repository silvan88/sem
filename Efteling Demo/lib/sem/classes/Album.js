Album = function() {
	this._name;
	this._pictures = {};
}

Album.prototype.initAlbum = function() {
	return sem.say('initAlbum');
}

Album.prototype.renderAlbum = function() {
	return sem.say('renderAlbum');
}

Album.prototype.takePicture = function(callback) {
	var $self = this;
	
    if(!navigator.camera) {
		sem.showAlert("Camera not supported on this device...", "Error");
        return;
	}
	
	$self._pictureOptions = {
		quality : 75, 
		destinationType : Camera.DestinationType.DATA_URL, 
		sourceType : Camera.PictureSourceType.CAMERA, 
		allowEdit : false,
		encodingType: Camera.EncodingType.JPEG,
		saveToPhotoAlbum: false
	};
	
	function onPhotoSuccess(imageData){
        var obj = {
            'imageData' : imageData,
            'url' : "data:image/jpeg;base64," + imageData
        };
        
        if (callback && typeof(callback) === "function") {
            return callback(obj);
        }
	};
	
	function onPhotoFail(){
		if (callback && typeof(callback) === "function") {
            return callback('false');
        }
	};
	
	navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, $self._pictureOptions);
}

Album.prototype.addPicture = function() {
	return sem.say('addPicture');
}
Album.prototype.removePicture = function() {
	return sem.say('removePicture');
}

Album.prototype.getName = function() {
	return this._name;
}
Album.prototype.setName = function(value) {
	return this._name = value;
}

Album.prototype.getPictures = function() {
	return this._pictures;
}
Album.prototype.setPictures = function(value) {
	return this._pictures = value;
}