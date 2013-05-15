/*! SEM - Smart Event Mobility v0.1 capgemini.com | capgemini.com/sem/license */

//Load SEM
_loadSem();

function _loadSem(){
	say("Initializing SEM...");
	$.when(
	    $.getScript("lib/sem/sem_engine.js"),
	    $.getScript("lib/sem/classes/Map.js"),
	    $.getScript("lib/sem/classes/Album.js"),
	    $.getScript("lib/sem/classes/Calendar.js"),
	    $.getScript("lib/sem/classes/Profile.js"),
	    $.getScript("lib/sem/classes/Me.js"),
	    $.getScript("lib/sem/classes/Poi.js"),
	    $.getScript("controller/HomeController.js"),
	    $.getScript("controller/ParkController.js"),
	    $.getScript("controller/MeController.js"),
	    $.getScript("controller/PoiController.js"),
	    $.Deferred(function( deferred ){
	        $( deferred.resolve );
	    })
	).done(function(){
		say("SEM 2.0 initialized, starting SEM...");
		_startSem();
	});
}

function _startSem(){
	say("SEM started!");
	registerEvents();
	
	//Call home controller
	Home.init();
}

function registerEvents() {
	var self = this;
	// Check of browser supports touch events...
	if (document.documentElement.hasOwnProperty('ontouchstart')) {
		// ... if yes: register touch event listener to change the "selected" state of the item
		$('body').on('touchstart', 'a', function(event) {
			$(event.target).addClass('tappable-active');
		});
		$('body').on('touchend', 'a', function(event) {
			$(event.target).removeClass('tappable-active');
		});
	} else {
		// ... if not: register mouse events instead
		$('body').on('mousedown', 'a', function(event) {
			$(event.target).addClass('tappable-active');
		});
		$('body').on('mouseup', 'a', function(event) {
			$(event.target).removeClass('tappable-active');
		});
	}
	$(window).on('hashchange', $.proxy(sem.route, this));
}

function say(message) {
	console.log("SEM 2.0: "+message);
}

function extend(ChildClass, ParentClass) {
	ChildClass.prototype = new ParentClass();
	ChildClass.prototype.constructor = ChildClass;
}