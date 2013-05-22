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
	},
	
	render: function(){
		sem.buildView('HomeView', Home.addSwipeEvent);
	},
	
	addSwipeEvent: function(){
        $elm = sem.getPlaceholderElm('HomeView');
		
        $elm.hammer({drag_max_touches:0}).on("swipedown", function(event) {
			Home.showTopMenu();
		});
	},
	
	showTopMenu: function(){
		$('#homeTopView').slideDown(function(){
			$elm = sem.getPlaceholderElm('HomeView');
			$elm.hammer({drag_max_touches:0}).on("swipeup", function(event) {
				Home.hideTopMenu();
			});
		});
	},
	
	hideTopMenu: function(){
		$('#homeTopView').slideUp(function(){
			$elm = sem.getPlaceholderElm('HomeView');
			$elm.hammer({drag_max_touches:0}).on("swipedown", function(event) {
				Home.showTopMenu();
			});
		});
	}
}