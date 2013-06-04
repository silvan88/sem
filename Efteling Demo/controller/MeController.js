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
		sem.buildView('MeView', Me.addAlbum);
	},
    
    addAlbum: function() {
        Me.album = new Album();
    },
    
    takePicture: function() {
        Me.album.takePicture();
    }
}