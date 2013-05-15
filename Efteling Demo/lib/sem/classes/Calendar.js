Calendar = function() {
	this._name;
	this._items = {};
}

Calendar.prototype.initCalendar = function() {
	return say('initCalendar');
}
Calendar.prototype.renderCalendar = function() {
	return say('renderCalendar');
}

Calendar.prototype.addItem = function() {
	return say('addItem');
}
Calendar.prototype.removeItem = function() {
	return say('removeItem');
}
Calendar.prototype.alertItem = function() {
	return say('alertItem');
}

Calendar.prototype.getName = function() {
	return this._name;
}
Calendar.prototype.setName = function(value) {
	return this._name = value;
}

Calendar.prototype.getPictures = function() {
	return this._items;
}
Calendar.prototype.setPictures = function(value) {
	return this._items = value;
}