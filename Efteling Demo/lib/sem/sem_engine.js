/**
 * SEM engine. Controlls the MVC structure.
 * @param Name of the event
 * @param List of the POIS for the Event
 * @class
 * Class description
 */
var sem;
 
Sem_engine = function(eventName) {
	this._eventName = eventName;
	this._poiList = [];
	this._pages = [];
	this._placeHolders = [];
	this._loadedTemplates = [];
	
	$("head").append("<title>"+eventName+"</title>");
}

Sem_engine.prototype.back = function() {
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
Sem_engine.prototype.route = function() {
	var hash = window.location.hash;
	if (!hash) {
		sem.goTo('Home', 'init');
		return;
	} else {
		return sem.goTo(hash.slice(1), 'init');
	}
}
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
			
			$self.show(viewName);
			
			if (callback && typeof(callback) === "function") {  
				callback();  
			}
		});
	} else {
		$(".placeholder").hide();
		$self.getPlaceholderElm(viewName).show();
	}

	return $('div.placeholder').height(getWindowSizes().windowHeight);
}
Sem_engine.prototype.renderPage = function(viewName, action){
	var $self = this;
	$.when( $self.buildView(viewName) ).done(function(){
		//eval(action+"()");
		$self.view(viewName);
	});
}
Sem_engine.prototype.renderPartial = function(data, template, location){
	var $self = this;
	$.Mustache.load('view/'+template+'.html').done(function () {
		var $elm = $self.getPlaceholderElm(location);
		//RELOAD PROTECT INBOUWEN
			$elm.empty();
		//RELOAD PROTECT INBOUWEN
		$elm.mustache('tpl-'+template, data);
	});
}
Sem_engine.prototype.show = function(name) {
	$(".placeholder").hide();
	$(".placeholder[name='"+name+"']").show();
}
Sem_engine.prototype.goTo = function(controller, action, name) {
	//BETERE FUNCTIE
	if(action == undefined){
		eval(controller+".init()");
	} else {
		eval(controller+"."+action+"()");
	}
}

Sem_engine.prototype.getPlaceholders = function() {
	return this._placeHolders;
}
Sem_engine.prototype.setPlaceholderStatus = function(placeholderName, status) {
	$.each(this._placeHolders, function(key, obj){
		if(obj.placeholder == placeholderName){
			obj.loaded = status;
			return;
		}
	});
}
Sem_engine.prototype.addPlaceholder = function(placeholderName, status) {
	var obj = { 
		"placeholder" : placeholderName,
		"loaded" : status
	}
	this._placeHolders.push(obj);
}
Sem_engine.prototype.checkPlaceholderView = function(viewName) {
	var check = false;
	$.each(this._placeHolders, function(nr, obj){
		if(obj.placeholder == viewName){
			check = obj;
		}
	});
	return check;
}
Sem_engine.prototype.getPlaceholderElm = function(placeholderName) {
	return $(".placeholder[name='"+placeholderName+"']");
}