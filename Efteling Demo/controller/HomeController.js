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
		
		Home.topMenu = false;
		Home.botMenu = false;
	},
	
	render: function(){
		sem.buildView('HomeView', function(){
            var $elm = sem.getPlaceholderElm('HomeView');
			
            Home.setEvents($elm);
			
			$('a').hammer().on("tap", function(e) {
				e.preventDefault();
				Home.hideTopMenu($elm);
				window.location = $(this).attr('href');
			});
        });
	},
		
	setEvents: function($elm){
		//var carousel = new Carousel($elm);
		//carousel.init();
		
		//$elm.hammer({ drag_lock_to_axis: true })
		//	.on("release dragup dragdown swipeup swipedown", Home.handleHammer);
		
		sem.unbindEvent($elm, 'swipedown, dragdown');
		sem.unbindEvent($elm, 'swipeup, dragup');
        $elm.ontouchmove = function(e) {e.preventDefault()};
		//var home = new Hammer($elm);
		
		/*home.ondrag = function (event) {
			$('#homeTopView').style.top  = event.distanceY + 'px',
			$('#homeTopView').style.left = event.distanceX + 'px';
		};
		home.ondragend = function (event) {
			$('#homeTopView').style.top  = '0px',
			$('#homeTopView').style.left = '0px';
		};*/

		
		sem.addEvent($elm, {event: 'swipedown, dragdown', max_touches: 0}, function(){
			sem.unbindEvent($elm, 'swipedown, dragdown');
			sem.unbindEvent($elm, 'swipeup, dragup');
			Home.showTopMenu($elm);
		});
        
        sem.addEvent($elm, {event: 'swipeup, dragup', max_touches: 0}, function(){
			sem.unbindEvent($elm, 'swipedown, dragdown');
			sem.unbindEvent($elm, 'swipeup, dragup');
			Home.showBotMenu($elm);
		});
	},
	
	handleHammer: function(ev) {
		console.log(ev);
		// disable browser scrolling
		ev.gesture.preventDefault();
		var $elm = sem.getPlaceholderElm('HomeView');

		switch(ev.type) {
			case 'dragdown':
				Home.showTopMenu($elm);
				ev.gesture.stopDetect();
				break;
				
			case 'dragup':
				Home.hideTopMenu($elm);
				ev.gesture.stopDetect();
				break;

			case 'swipeup':
				Home.showTopMenu($elm);
				ev.gesture.stopDetect();
				break;

			case 'swipedown':
				Home.hideTopMenu($elm);
				ev.gesture.stopDetect();
				break;

			case 'release':
				// more then 50% moved, navigate	-	KIJK OF DELTA X AANGEPAST MOET WORDEN
				/*if(Math.abs(ev.gesture.deltaX) > pane_width/2) {
					if(ev.gesture.direction == 'down') {
						self.prev();
					} else {
						self.next();
					}
				}
				else {
					self.showPane(current_pane, true);
				}*/
				break;
		}
	},
	
	showTopMenu: function($elm){
		var height = $('#homeTopView').css('height');
		$('#homeTopView').css({'margin-top' : '-'+height, 'display' : 'block'});
		
		$elm.transition({y:height}, 100, 'in', function(){
			sem.addEvent($elm, {event: 'swipeup, dragup', max_touches: 0}, function(){
				sem.unbindEvent($elm, 'swipeup, dragup');
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
			sem.addEvent($elm, {event: 'swipedown, dragdown', max_touches: 0}, function(){
				sem.unbindEvent($elm, 'swipedown, dragdown');
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