(function() {

	// Holder for the gif after it has been created but before it's uploaded.
	var base64EncodedGif,
		// Holder for the URL that points to the gif after upload.
		url;

	function generateQuickGuid() {
		return Math.random().toString( 36 ).substring( 2, 15 ) +
			Math.random().toString( 36 ).substring( 2, 15 );
	};

	function uploadGif() {
		var deferred = $.Deferred(),
			file = {
				Filename: generateQuickGuid() + ".gif",
				ContentType: "image/gif",
				base64: base64EncodedGif
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

	function buildGif() {
		var encoder = new GIFEncoder();
		encoder.setRepeat( 0 );
		encoder.setDelay( 200 );

		encoder.start();

		// Add images     
		$( "#images img" ).each(function() {
			var canvas = renderImageInCanvas( this, canvas ),
				context = canvas.getContext( "2d" );
			encoder.addFrame( context );
		});

		encoder.finish();
		
		base64EncodedGif = encode64( encoder.stream().getData() );
		
		$( "<img>" )
			.attr( "src", "data:image/gif;base64," + base64EncodedGif )
			.load(function() {
				$( "#result" ).html( this );
				$( "#preview-container" ).removeClass( "loading" );
				app.hideLoading();
			});
	};

	function closeConfirmationDialog() {
		$( "#confirmation" ).kendoMobileModalView( "close" );
		$( "#shareGif" ).prop( "disabled", true );
	};

	window.init = {
		confirm: function() {
			$( "#shareGif" ).data( "kendoMobileButton" ).bind( "click", function() {
				app.navigate( "#share" );
				$( app.pane.loader.element ).find( "h1" ).text( "Uploading..." );
				var container = $( "#share-results-container" ).addClass( "loading" );
				app.showLoading();
				setTimeout(function() {
					uploadGif().then(function( data ) {
						app.hideLoading();
						container.removeClass( "loading" );
					});
				}, 3000 );
			});
		}
	}

	$( document )
		.on( "focus", "input", function() {
			// See http://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari#answer-7436574
			var self = this;
			setTimeout(function() {
				self.setSelectionRange( 0, 9999 );
			});
		})
		.on( "click", "#viewOnline", function(event) {
			event.preventDefault();
			window.open( $( this ).attr( "href" ), "_blank" );
		});
}());