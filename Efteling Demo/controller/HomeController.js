/**
 * Constructor description
 * @param option The first arguMembernt
 * @class
 * Class description
 */
sem = new Sem_engine("Efteling - Demo");

var Home = {
	init: function() {	
		//Start here
		
		Home.render();
	},
	
	render: function() {
		sem.buildView('HomeView', Home.addSwipeEvent);
	},
	
	addSwipeEvent: function() {
		$('body').bind('swipeup', Home.AlertTest); //show next hides screen1, shows screen2 
	},
	
	AlertTest: function(){
		showAlert('swipedUp!');
	}
}