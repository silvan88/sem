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
		sem.buildView('ParkView', Park.doMore);
	},
	
	doMore: function() {
		map = new Map();
		map.setLocation(51.65005, 5.04768);
		map.renderMap('ParkView');
		map.setPoiMarkers(poiModel.getAllPois());
	}
}