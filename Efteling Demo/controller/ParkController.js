/**
 * Constructor description
 * @param option The first arguMembernt
 * @class
 * Class description
 */

var Park = {
	init: function() {	
		poiModel = new PoiModel(Park.render);
	},
	
	render: function() {
		sem.buildView('ParkView', Park.buildMap, poiModel.getAllPois());
	},
	
	buildMap: function() {
		map = new Map();
		map.renderMap('ParkView');
		map.setPoiMarkers(poiModel.getAllPois(), Park.clickMarker);
		map.setLocation(51.65005, 5.04768);
		
		$('.pois-detailScreen-close').click(function(){
			$('.poi').hide();
			$('#pois-detailScreen').hide();
		});
	},
	
	clickMarker: function($self) {
		$('#pois-detailScreen').show();
		$('#pois-detailScreen-'+$self.id).show()
	},
	
	callMe: function(arg1, arg2) {
		sem.showAlert('para 1: ' + arg1 + ' para 2: ' + arg2 + ' arguments: ' + arguments.length);
	}
}