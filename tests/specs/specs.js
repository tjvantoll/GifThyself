spec(function() {
	var getPictureSteps = [
		web.getTextContent({ id: "getPicture" }, function( result ) {
			assert( result.trim() ).equals( "Add Picture" );
		}),
		web.wait( 1000 )
	];

	var stepRepository = {
		"Given GifThyself is running": {
			ios: [
				ios.launch( "gifthyself://" )
			],
			android: [
				android.launch( "com.telerik.GifThyself" ),
				android.wait( 4000 )
			]
		},

		"Then the Add Picture button should be displayed" : {
			ios: getPictureSteps,
			android: getPictureSteps
		}
	};

	describe( "GifThyself", function() {
		test( "Starting screen is displayed appropriately", function() {
			step( "Given GifThyself is running" );
			step( "Then the Add Picture button should be displayed" );
		});
	}, stepRepository );
});
