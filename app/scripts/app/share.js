(function() {
	"use strict";

	window.models.share = kendo.observable({
		share: function() {
			// http://plugins.telerik.com/plugin/socialsharing
			window.plugins.socialsharing.share(
				null, /* message */
				null, /* subject */
				null, /* file */
				this.get( "url" )
			);
		},
		view: function() {
			window.open( this.get( "url" ), "_blank" );
		}
	});

	$( document ).on( "focus", "input", function() {
		// See http://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari#answer-7436574
		var self = this;
		setTimeout(function() {
			self.setSelectionRange( 0, 9999 );
		});
	});
}());