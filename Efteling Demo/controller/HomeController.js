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
			Home.showTopMenu($elm);
		});
	},
	
	showTopMenu: function($elm){
		
		/* $('#homeTopView').transition({marginTop:'0px'}, function(){
			$elm = sem.getPlaceholderElm('HomeView');
			$elm.hammer({drag_max_touches:0}).on("swipeup", function(event) {
				Home.hideTopMenu();
			});
		}); */
		
		$elm.transition({marginTop:'23%'}, function(){
			//$elm = sem.getPlaceholderElm('HomeView');
			$elm.hammer({drag_max_touches:0}).on("swipeup", function(event) {
				Home.hideTopMenu($elm);
			});
		});
	},
	
	hideTopMenu: function($elm){
		/* $('#homeTopView').transition({marginTop:'-24%'}, function(){
			$elm = sem.getPlaceholderElm('HomeView');
			$elm.hammer({drag_max_touches:0}).on("swipedown", function(event) {
				Home.showTopMenu();
			});
		}); */
		
		$elm.transition({marginTop:'0px'}, function(){
			//$elm = sem.getPlaceholderElm('HomeView');
			$elm.hammer({drag_max_touches:0}).on("swipeup", function(event) {
				Home.hideTopMenu($elm);
			});
		});
	}
}