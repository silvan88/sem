Album = function() {
	/*this._name;
	this._pictures = {};
	this._pictureOptions = {
		quality : 75, 
		destinationType : Camera.DestinationType.DATA_URL, 
		sourceType : Camera.PictureSourceType.CAMERA, 
		allowEdit : false,
		encodingType: Camera.EncodingType.JPEG,
		saveToPhotoAlbum: true
	};*/
}

Album.prototype.initAlbum = function() {
	return sem.say('initAlbum');
}

Album.prototype.renderAlbum = function() {
	return sem.say('renderAlbum');
}

Album.prototype.takePicture = function() {
	var $self = this;
	
	if(!navigator.camera) {
		sem.showAlert("Camera not supported on this device...", "Error");
        return;
	}
	
	navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, $self._pictureOptions);
	
	onPhotoSuccess = function(){
		var $elm = sem.getPlaceholderElm('Me');
		$elm.css('background-image', "url('data:image/jpeg;base64," + imageData + "')");
	}
	
	onPhotoFail = function(){
		sem.showAlert('Error taking picture', 'Error');
	};
	
	return sem.showAlert('DONE');
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