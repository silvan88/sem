/**
 * Constructor description
 * @param option The first arguMembernt
 * @class
 * Class description
 */

var Me = {
	init: function() {	
		//Start here
		Me.render();
	},
	
	render: function() {
		sem.buildView('MeView');
	},
	
	takePicture: function() {
		if (!navigator.camera) {
			sem.showAlert("Camera API not supported", "Error");
			return;
		}
		var options =   {   quality: 50,
							destinationType: Camera.DestinationType.DATA_URL,
							sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
							encodingType: 0     // 0=JPG 1=PNG
						};
	 
		navigator.camera.getPicture(
			function(imageData) {
				sem.getPlaceholderElm('Me').css('backgroundImage', "url('data:image/jpeg;base64," + imageData + "')");
			},
			function() {
				sem.showAlert('Error taking picture', 'Error');
			},
			options);
	 
		return false;
	}
}

/*

var Me = {
	init: function() {	
		//Start here
		
		//Me.render();
	},
	
	render: function() {
		sem.buildView('MeView', Me.addAlbum);
	},
    
    addAlbum: function() {
        var Me.album = new Album();
    },
    
    takePicture: function() {
        Me.album.takePicture();
    }
}

*/