/**
 * Constructor description
 * @param option The first arguMembernt
 * @class
 * Class description
 */
 
PoiModel = function(callback) {
	$self = this;
	$self._poisList;
	
	$.getJSON('model/data/pois.json', function(data){
		$self._poisList = data;
		if (callback && typeof(callback) === "function") { 
			return callback();  
		}
	})
	.fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ', ' + error;
		return say( "Request Failed: " + err);
	});
}

PoiModel.prototype.getAllPois = function() {
	return this._poisList.pois;
}