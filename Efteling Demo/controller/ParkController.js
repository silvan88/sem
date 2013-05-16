/**
 * Constructor description
 * @param option The first arguMembernt
 * @class
 * Class description
 */

var Park = {
	init: function() {	
		//Start here
		
		Park.render();
		say('PARK CONTROLLER');
	},
	
	render: function() {
		sem.buildView('MapView', Park.doMore);
	},
	
	doMore: function() {
		map = new Map();
        map.setLocation(51.649182, 5.027876)
		map.renderMap('MapView');
	}
}