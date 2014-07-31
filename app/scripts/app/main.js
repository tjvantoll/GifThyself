(function () {
	"use strict";

	/******************************************************************/
	// global error handling
	/******************************************************************/
	/*function showAlert( message, title, callback ) {
		window.alert( message, callback || function () {}, title, "OK" );
	};
	function showError( message ) {
		showAlert( message, "Error occurred" );
	};
	window.addEventListener( "error", function ( e ) {
		e.preventDefault();
		var message = e.message + "' from " + e.filename + ":" + e.lineno;
		showAlert( message, "Error occurred" );
		return true;
	});*/

	window.el = new Everlive( "oFGC6drHAMPPmAwG" );
	window.renderImageInCanvas = function( image, canvas ) {
		var mpImg = new MegaPixImage( image ),
			canvas = canvas || document.createElement( "canvas" );

		// See http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
		mpImg.render( canvas, { maxWidth: 350, maxHeight: 350 });
		return canvas;
	};
	window.models = {};

	document.addEventListener( "deviceready", function () {
		window.app = new kendo.mobile.Application( document.body, { 
			transition: "slide",
			skin: "flat"
		});
		navigator.splashscreen.hide();
		analytics.Start();
	}, false );
}());






