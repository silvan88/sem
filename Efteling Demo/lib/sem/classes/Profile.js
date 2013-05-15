Profile = function() {
	this._id;
	this._name;
	this._location;
}

Profile.prototype.getId = function() {
	return this._id;
}
Profile.prototype.setId = function(value) {
	return this._id = value;
}

Profile.prototype.getName = function() {
	return this._name;
}
Profile.prototype.setName = function(value) {
	return this._name = value;
}

Profile.prototype.getLocation = function() {
	return this._location;
}
Profile.prototype.setLocation = function(value) {
	return this._location = value;
}