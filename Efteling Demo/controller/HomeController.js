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
		document.ontouchmove = function(e) {e.preventDefault()};
		
        var $elm = sem.getPlaceholderElm('HomeView');
		
		Home.setEvents($elm);
	},
	
	setEvents: function($elm){
		sem.addEvent($elm, {event: 'swipedown', max_touches: 0}, function(){
			sem.unbindEvent($elm, 'swipedown');
			sem.unbindEvent($elm, 'swipeup');
			Home.showTopMenu($elm);
		});
        
        sem.addEvent($elm, {event: 'swipeup', max_touches: 0}, function(){
			sem.unbindEvent($elm, 'swipedown');
			sem.unbindEvent($elm, 'swipeup');
			Home.showBotMenu($elm);
		});
	},
	
	showTopMenu: function($elm){
		var height = $('#homeTopView').css('height');
		$('#homeTopView').css({'margin-top' : '-'+height, 'display' : 'block'});
		
		$elm.transition({y:height}, 100, 'in', function(){
			sem.addEvent($elm, {event: 'swipeup', max_touches: 0}, function(){
				sem.unbindEvent($elm, 'swipeup');
				Home.hideTopMenu($elm);
			});
		});
        
        $('#mainHeader').transition({y:height}, 100, 'in');
	},
	
	hideTopMenu: function($elm){		
		$elm.transition({y:'0px'}, 100, 'in', function(){
			Home.setEvents($elm);
		});
        $('#mainHeader').transition({y:'0px'}, 100, 'in');
	},
    
    showBotMenu: function($elm){
		var height = $('#homeBottomView').css('height');
       
        $('#homeBottomView').css({'margin-top' : '0px'});
		
		$elm.transition({y: '-'+height}, 100, 'in', function(){
			sem.addEvent($elm, {event: 'swipedown', max_touches: 0}, function(){
				sem.unbindEvent($elm, 'swipedown');
				Home.hideBotMenu($elm);
			});
		});
        
        $('#mainHeader').transition({y:'-'+height}, 100, 'in');
	},
	
	hideBotMenu: function($elm){		
		$elm.transition({y:'0px'}, 100, 'in', function(){
			Home.setEvents($elm);
		});
        
        $('#mainHeader').transition({y:'0px'}, 100, 'in');
	}
}