/**
 * Constructor description
 * @param option The first arguMembernt
 * @class
 * Class description
 */


var Me = {
	init: function() {	
		//Start here
		Me.album = new Album();
		Me.render();
	},
	
	render: function() {
		sem.buildView('MeView');
	},
        
    takePicture: function() {
        Me.album.takePicture(function(data){
            if(data){
                sem.getPlaceholderElm('MeView').css('background-image', 'url("' + data.url + '")');
                sem.show('MeView');
            } else {
                sem.showAlert(data);
            }
        });
    }
}