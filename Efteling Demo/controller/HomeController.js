/**
 * Constructor description
 * @param option The first arguMembernt
 * @class
 * Class description
 */
sem = new Sem_engine("Efteling - Demo");
var Home = {
	init: function(){	
		//Start here
		
		Home.render();
        document.body.addEventListener('touchmove', function(event) {
            event.preventDefault();
        }, false); 
	},
	
	render: function(){
		sem.buildView('HomeView', Home.addSwipeEvent);
	},
	
	addSwipeEvent: function(){
        $elm.hammer({drag_max_touches:0}).on("swipedown", function(event) {
			var height = $('#homeTopView').css('height');
			$('#homeTopView').css({'margin-top' : '-'+height, 'display' : 'block'});
			Home.showTopMenu($elm, height);
		});
	},
	
	showTopMenu: function($elm, height){
		$elm.transition({marginTop:height}, function(){
			$elm.hammer({drag_max_touches:0}).on("swipeup", function(event) {
				Home.hideTopMenu($elm, height);
			});
		});
	},
	
	hideTopMenu: function($elm, height){
		$elm.transition({marginTop:'0px'}, function(){
			$elm.hammer({drag_max_touches:0}).on("swipeup", function(event) {
				Home.hideTopMenu($elm, height);
			});
		});
	}
}