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

	document.addEventListener( "deviceready", function () {
		window.app = new kendo.mobile.Application( document.body, { 
			transition: "slide", 
			skin: "flat",
			statusBarStyle: "black-translucent"
		});
		navigator.splashscreen.hide();
		analytics.Start();
	}, false );
}());






