(function() {
	"use strict";

	function share() {
		app.navigate( "#share" );
		$( app.pane.loader.element ).find( "h1" ).text( "Uploading..." );
		var container = $( "#share-results-container" ).addClass( "loading" );
		app.showLoading();
		setTimeout(function() {
			uploadGif().then(function( data ) {
				window.models.share.set( "url", data.result.Uri );
				app.hideLoading();
				container.removeClass( "loading" );
			});
		}, 3000 );
	};

	function uploadGif() {
		var deferred = $.Deferred(),
			file = {
				Filename: generateQuickGuid() + ".gif",
				ContentType: "image/gif",
				base64: window.base64EncodedGif
			};
		el.Files.create( file,
			function( data ) {
				deferred.resolve( data );
			},
			function( error ) {
				alert( "Image upload failed." );
				deferred.reject( error );
			}
		);
		return deferred;
	};

	function generateQuickGuid() {
		return Math.random().toString( 36 ).substring( 2, 15 ) +
			Math.random().toString( 36 ).substring( 2, 15 );
	};

	window.models.confirm = kendo.observable({
		yes: share
	});
}());