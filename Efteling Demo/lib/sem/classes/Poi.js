Poi = function(name) {
	this.setName(name);
	this._category;
	this._members = {};
}

extend(Poi, Profile);

Poi.prototype.initPoi = function() {
	return say('initPoi');
}
Poi.prototype.renderPoi = function() {
	return say('renderPoi');
}

Poi.prototype.showPoiInfo = function() {
	return say('showPoiInfo');
}
Poi.prototype.showMembers = function() {
	return say('showMembers');
}
//niet zeker of deze hier thuis hoort
Poi.prototype.takeMeHere = function() {
	return say('takeMeHere');
}

Poi.prototype.getCategory = function() {
	return this._category;
}
Poi.prototype.setCategory = function(value) {
	return this._category = value;
}

Poi.prototype.getMembers = function() {
	return this._members;
}
Poi.prototype.setMembers = function(value) {
	return this._members = value;
}