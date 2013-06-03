Album = function() {
	this._name;
	this._pictures = {};
}

Album.prototype.initAlbum = function() {
	return say('initAlbum');
}

Album.prototype.renderAlbum = function() {
	return say('renderAlbum');
}

Album.prototype.takePicture = function() {
    sem.showAlert('takePicture');
	return say('takePicture');
}

Album.prototype.addPicture = function() {
	return say('addPicture');
}
Album.prototype.removePicture = function() {
	return say('removePicture');
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