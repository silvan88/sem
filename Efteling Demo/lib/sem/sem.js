/*! SEM - Smart Event Mobility v0.1 capgemini.com | capgemini.com/sem/license */
var sem;

function initSem(options){
	var defaultOptions = {
		'eventName': 'SEM event', 
		'controllers': [
			{'name': 'HomeController'}
		],
		'models': [
			{'name': 'PoiModel'}
		]
	}
	
	if (typeof options == 'object') {
		options = $.extend(defaultOptions, options);
	} else {
		options = defaultOptions;
	}
	
	_loadSem(options);
}

function _loadSem(options){
	$.when(
		$.getScript("lib/sem/lib/mustache.js"),
		$.getScript("lib/sem/lib/jquery.mustache.js"),
		$.getScript("lib/sem/lib/jquery.hammer.js"),
		$.getScript("lib/sem/lib/jquery.transit.min.js"),
	    $.getScript("lib/sem/sem_engine.js"),
	    $.getScript("lib/sem/classes/Album.js"),
	    $.getScript("lib/sem/classes/Calendar.js"),
	    $.getScript("lib/sem/classes/Profile.js"),
		$.getScript("lib/sem/classes/Map.js"),
	    $.getScript("lib/sem/classes/Me.js"),
	    $.getScript("lib/sem/classes/Poi.js"),
		_loadControllers(options.controllers),
		_loadModels(options.models),
	    $.Deferred(function( deferred ){
	        $( deferred.resolve );
	    })
	).done(function(){
		sem = new Sem_engine(options.eventName);
		sem.say("SEM initialized, starting SEM...");
        sem.showAlert('Done loading! Starting SEM');
		_startSem();
	});
}

function _loadControllers(controllers){
	var dfd = $.Deferred();
	$.each(controllers, function(k, controller){
		$.getScript("controller/"+controller.name+".js");
		dfd.resolve();
	});
    sem.showAlert('Controllers loaded!');
	return dfd.promise();
}

function _loadModels(models){
	var dfd = $.Deferred();
	$.each(models, function(k, model){
		$.getScript("model/"+model.name+".js");
		dfd.resolve();
	});
    sem.showAlert('Models loaded!');
	return dfd.promise();
}

function _startSem(){
	sem.registerEvents();
	sem.setWindowSizes();
	
	//Call home controller
	Home.init();
	sem.say("SEM started!");
}