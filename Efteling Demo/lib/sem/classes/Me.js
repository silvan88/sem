Me = function() {
	this._eTicket;
	this._favorites = [];
	this.calendar = new Calendar();
	this.album = new Album();
}

extend(Me, Profile);

Me.prototype.initMe = function() {
	return say('initMe');
}
Me.prototype.renderMe = function() {
	return say('renderMe');
}

Me.prototype.addFavorite = function(favorite) {
	return say('addFavorite');
}
Me.prototype.removeFavorite = function() {
	return say('removeFavorite');
}

Me.prototype.getEticket = function() {
	return this._eTicket;
}
Me.prototype.setEticket = function(value) {
	return this._eTicket = value;
}

Me.prototype.getFavorites = function() {
	return this._favorites;
}
Me.prototype.setFavorites = function(value) {
	return this._favorites = value;
}