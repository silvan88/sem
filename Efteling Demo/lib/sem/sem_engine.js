/**
 * SEM engine. Controlls the MVC structure.
 * @param Name of the event
 * @class
 * Class description
 */
Sem_engine = function(eventName) {
	this._poiList = [];
	this._pages = [];
	this._placeHolders = [];
	this._loadedTemplates = [];

	this._eventName = eventName || 'SEM Event';

	$("head").append("<title>"+this._eventName+"</title>");
}


/* Events */
Sem_engine.prototype.addTransition = function(){
	//import transition
}

Sem_engine.prototype.addEvent = function($elm, options, func){
	var defaultOptions = {
		max_touches: 0,
		event: 'tap'
	}

	if (typeof options == 'object') {
		options = $.extend(defaultOptions, options);
	} else {
		options = defaultOptions;
	}

	$elm.hammer({drag_max_touches:options.max_touches}).on(options.event, func);
}

Sem_engine.prototype.unbindEvent = function($elm, event){
	$elm.unbind(event);
}

Sem_engine.prototype.registerEvents = function(){
	var $self = this;
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
	return $(window).on('hashchange', $.proxy($self.route, this));
}


/* System */
Sem_engine.prototype.setWindowSizes = function(){
	window._deviceSize = {
		windowHeight : 0,
		windowWidth : 0
	};

	if (typeof (window.innerWidth) == 'number') {
		window._deviceSize.windowHeight = window.innerHeight;
		window._deviceSize.windowWidth = window.innerWidth;
	} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
		window._deviceSize.windowHeight = document.documentElement.clientHeight;
		window._deviceSize.windowWidth = document.documentElement.clientWidth;
	} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
		window._deviceSize.windowHeight = document.body.clientHeight;
		window._deviceSize.windowWidth = document.body.clientWidth;
	}
}

Sem_engine.prototype.getWindowSizes = function(){
	return window._deviceSize;
}

Sem_engine.prototype.showAlert = function(message, title){
	if (navigator.notification) {
		navigator.notification.alert(message, null, title, 'OK');
	} else {
		alert(title ? (title + ": " + message) : message);
	}
}

Sem_engine.prototype.say = function(message){
	console.log("SEM: "+message);
}

Sem_engine.prototype.extend = function(ChildClass, ParentClass){
	ChildClass.prototype = new ParentClass();
	ChildClass.prototype.constructor = ChildClass;
}


/* Navigation */
Sem_engine.prototype.route = function(){
	var $self = this, hash = window.location.hash, route;

	if (!hash) {
		return $self.goTo('Home', 'init');
	} else {
		route = hash.slice(1).split('/') ;
		return $self.goTo(route[0], route[1], route[2]);
	}
}

Sem_engine.prototype.goTo = function(controller, action, parameters){
	var $self = this;
	
	if(!action){
		//window[controller].init();
		$self.show(controller + 'View');
	} else if(!parameters){
		window[controller][action].call();
	} else {
		window[controller][action].apply(null, parameters.split('&'));
	}
}

Sem_engine.prototype.back = function(){
	if(navigator.app) {
		if($(".placeholder[name='HomeView']").css('display') == 'block'){
			//To exit the application:
			return navigator.app.exitApp();
		} else {
			//To use the back button:
			return navigator.app.backHistory();
		}
	} else {
		return history.back();
	}
}

Sem_engine.prototype.show = function(name) {
	$(".placeholder").hide();
	$(".placeholder[name='"+name+"']").show();
}


/* View */
Sem_engine.prototype.buildView = function(viewName, callback, data){
	var $self = this;
	var $placeHolder;

	var placeHolderExists = $self.checkPlaceholderView(viewName);
	if(!placeHolderExists){
		$placeHolder = $('<div/>', {
			'class' : 'placeholder',
			'name' : viewName
		}).appendTo('.page[name="MasterPage"]');
		$self.addPlaceholder(viewName, false);

		$.Mustache.load('view/'+viewName+'.html').done(function () {
			$placeHolder.mustache('tpl-'+viewName, data);
			$self.setPlaceholderStatus(viewName, true);

			//$self.show(viewName);

			if (callback && typeof(callback) === "function") {
				callback();
			}
		});
	} else {
		$(".placeholder").hide();
		//$self.getPlaceholderElm(viewName).show();
	}

	return $('div.placeholder').height($self.getWindowSizes().windowHeight);
}

Sem_engine.prototype.getPlaceholders = function(){
	return this._placeHolders;
}

Sem_engine.prototype.setPlaceholderStatus = function(placeholderName, status){
	$.each(this._placeHolders, function(key, obj){
		if(obj.placeholder == placeholderName){
			obj.loaded = status;
			return;
		}
	});
}

Sem_engine.prototype.addPlaceholder = function(placeholderName, status){
	var obj = {
		"placeholder" : placeholderName,
		"loaded" : status
	}
	this._placeHolders.push(obj);
}

Sem_engine.prototype.checkPlaceholderView = function(viewName){
	var check = false;
	$.each(this._placeHolders, function(nr, obj){
		if(obj.placeholder == viewName){
			check = obj;
		}
	});
	return check;
}

Sem_engine.prototype.getPlaceholderElm = function(placeholderName){
	return $(".placeholder[name='"+placeholderName+"']");
}