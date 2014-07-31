(function() {
	"use strict";

	function checkForImages() {
		var count = $( "#images img" ).length;
		if ( count < 2 ) {
			alert( "Please add at least 2 images." );
			return false;
		}
		return true;
	};

	function getPicture() {
		analytics.Monitor().TrackFeature( "Image.Add" );
		navigator.camera.getPicture(function( data ) {
			var canvas,
				image = $( "<img>" ),
				imageContainer = $( "<div>" );

			image.attr( "src", "data:image/jpeg;base64," + data );
			canvas = renderImageInCanvas( image[ 0 ] );

			imageContainer.append( canvas, image, $( "<button><span>X</span></button>" ) );
			$( "#images" ).append( imageContainer );
		}, function( message ) {
			alert( "Image add failed: " + message );
		}, {
			destinationType: Camera.DestinationType.DATA_URL,
			targetWidth: 300,
			targetHeight: 200
		});
	};

	function navigate() {
		if ( checkForImages() ) {
			app.navigate( "#preview" );
			$( app.pane.loader.element ).find( "h1" ).text( "Building..." );
			$( "#preview-container" ).addClass( "loading" );
			app.showLoading();
		}
	};

	window.models.build = kendo.observable({
		getPicture: getPicture,
		navigate: navigate
	});

	$( document ).on( "click", "#images button", function() {
		$( this ).parents( "div" ).first().remove();
	});
}());