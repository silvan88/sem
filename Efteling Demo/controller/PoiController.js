/**
 * Constructor description
 * @param option The first arguMembernt
 * @class
 * Class description
 */

var Poi = {
	init: function() {	
		//Start here
		
		Poi.render();
	},
	
	render: function() {
		sem.buildView('PoiView', function(){
            //sem.getPlaceholderElm('PoiView').css({overflow : 'scroll'});
            //sem.getPlaceholderElm('PoiView').ontouchmove = true;

		}, poiModel.getAllPois());
	}
}