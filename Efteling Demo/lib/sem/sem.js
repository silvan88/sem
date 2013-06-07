/*! SEM - Smart Event Mobility v0.1 capgemini.com | capgemini.com/sem/license */
var sem;

/**
 * Initializes the SEM framework
 * @param {JSON} options
 */
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
	
    return document.addEventListener("deviceready", _loadSem(options), false);
}

function _loadSem(options){
	$.when(
	    $.getScript("lib/sem/sem_engine.js"),
		$.getScript("lib/sem/lib/mustache.js"),
		$.getScript("lib/sem/lib/jquery.mustache.js"),
		$.getScript("lib/sem/lib/jquery.hammer.js"),
		$.getScript("lib/sem/lib/jquery.transit.min.js"),
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
		_startSem(options.models, options.controllers);
	});
}

function _loadControllers(controllers){
	var dfd = $.Deferred(), getScriptReqs = [];
	
	for (var i = 0; i<controllers.length; i++) {
		getScriptReqs.push($.getScript("controller/"+controllers[i].name+".js"));
	}
	$.when.apply($, getScriptReqs).then(function() {
		dfd.resolve();
	});
	
	return dfd.promise();
}

function _loadModels(models){
	var dfd = $.Deferred(), getScriptReqs = [];
	
	for (var i = 0; i<models.length; i++) {
		getScriptReqs.push($.getScript("model/"+models[i].name+".js"));
	}
	$.when.apply($, getScriptReqs).then(function() {
		dfd.resolve();
	});
	
	return dfd.promise();
}

function _startSem(models, controllers){
	sem.registerEvents();
	sem.setWindowSizes();
	//for(var i = 0; i<models.length; i++) {
		poiModel = new PoiModel(function(){
		
	for(var i = 0; i<controllers.length; i++) {
		window[controllers[i].name.replace('Controller', '')].init();
	}
		});
	//}
	//Call home controller
	//Home.init();
	//sem.show('Home');
}