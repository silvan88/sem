/**
 * Constructor description
 * @param option The first arguMembernt
 * @class
 * Class description
 */
var Home = {
	init: function(){	
		//Start here
		
		Home.render();
	},
	
	render: function(){
		sem.buildView('HomeView', Home.addSwipeEvent);
	},
	
	addSwipeEvent: function(){
		var $elm = sem.getPlaceholderElm('HomeView');
		
		document.ontouchmove = function(e) {e.preventDefault()};
		
		sem.addEvent($elm, {event: 'swipedown', max_touches: 0}, function(){
			sem.unbindEvent($elm, 'swipedown');
			Home.showTopMenu($elm);
		});
	},
	
	showTopMenu: function($elm){
		var height = $('#homeTopView').css('height');
		$('#homeTopView').css({'margin-top' : '-'+height, 'display' : 'block'});
		
		$elm.transition({marginTop:height}, 'fast', function(){
			sem.addEvent($elm, {event: 'swipeup', max_touches: 0}, function(){
				sem.unbindEvent($elm, 'swipeup');
				Home.hideTopMenu($elm);
			});
		});
	},
	
	hideTopMenu: function($elm){		
		$elm.transition({marginTop:'0px'}, 'fast', function(){
			sem.addEvent($elm, {event: 'swipedown', max_touches: 0}, function(){
				sem.unbindEvent($elm, 'swipedown');
				Home.showTopMenu($elm);
			});
		});
	}
}