(function() {
	"use strict";

	function buildGif() {
		var encoder = new GIFEncoder();
		encoder.setRepeat( 0 );
		encoder.setDelay( 200 );
		encoder.start();

		$( "#images img" ).each(function() {
			var canvas = renderImageInCanvas( this, canvas ),
				context = canvas.getContext( "2d" );
			encoder.addFrame( context );
		});

		encoder.finish();
		
		window.base64EncodedGif = encode64( encoder.stream().getData() );
		
		$( "<img>" )
			.attr( "src", "data:image/gif;base64," + base64EncodedGif )
			.load(function() {
				$( "#result" ).html( this );
				$( "#preview-container" ).removeClass( "loading" );
				app.hideLoading();
			});
	};

	window.models.preview = kendo.observable({
		load: function() {
			setTimeout( buildGif, 3000 );
		}
	});
}());