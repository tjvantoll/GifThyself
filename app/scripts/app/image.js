(function() {

	// Holder for the gif after it has been created but before it's uploaded.
	var base64EncodedGif,
		// Holder for the URL that points to the gif after upload.
		url;

	function generateQuickGuid() {
		return Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15);
	};

	function uploadGif() {
		var deferred = $.Deferred(),
			file = {
				Filename: generateQuickGuid() + '.gif',
				ContentType: 'image/gif',
				base64: base64EncodedGif
			};
		el.Files.create(file,
			function(data) {
				deferred.resolve(data);
			},
			function(error) {
				alert('Image upload failed.');
				deferred.reject(error);
			}
		);
		return deferred;
	};

	function renderImageInCanvas(image, canvas) {
		var mpImg = new MegaPixImage(image),
			canvas = canvas || document.createElement('canvas'),
			iOS = window.app.os.ios;

		// See http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
		mpImg.render(canvas, { maxWidth: 350, maxHeight: 350, orientation: (iOS ? 6 : 1) });
		return canvas;
	};
	
	function getPicture() {
		analytics.Monitor().TrackFeature( "Image.Add" );
		navigator.camera.getPicture(function(data) {      
			var canvas,
				image = $('<img>'),
				imageContainer = $('<div>');
			
			image.attr('src', 'data:image/jpeg;base64,' + data);
			canvas = renderImageInCanvas(image[0]);

			imageContainer.append(canvas, image, $('<button><span>X</span></button>'));
			$('#images').append(imageContainer);
		}, function(message) {
			alert('Image add failed: ' + message);
		}, {
			destinationType: Camera.DestinationType.DATA_URL
		});  
	};
	
	function buildGif() {     
		var encoder = new GIFEncoder();
		encoder.setRepeat(0);
		encoder.setDelay(200);

		encoder.start();

		// Add images     
		$('#images img').each(function() {
			var canvas = renderImageInCanvas(this, canvas),
				context = canvas.getContext('2d');
			encoder.addFrame(context);
		});

		encoder.finish();
		
		base64EncodedGif = encode64(encoder.stream().getData());
		
		$('<img>')
		.attr('src', 'data:image/gif;base64,' + base64EncodedGif)
		.load(function() {
			$('#result').html(this);
			$('#preview-container').removeClass('loading');
			app.hideLoading();
		});
	};
	
	function checkForImages() {
		var count = $('#images img').length;
		if (count < 2) {
			alert('Please add at least 2 images.');
			return false;
		}
		return true;
	}
	
	function removeImage() {
		$(this).parents('div').first().remove();
	};
	
	function closeConfirmationDialog() {
		$('#confirmation').kendoMobileModalView('close');
		$('#shareGif').prop('disabled', true);
	};
	
	function share() {
		window.plugins.social.share("#gifthyself", url);
	}
	
	window.init = {
		build: function() {
			$('#buildGif').data('kendoMobileButton').bind('click', function() {
				if (checkForImages()) {
					app.navigate('#preview');
					$(app.pane.loader.element).find('h1').text('Building...');
					$('#preview-container').addClass('loading');
					app.showLoading();
					setTimeout(buildGif, 3000);   
				}
			});
			
			$('#getPicture').data('kendoMobileButton').bind('click', getPicture);
		},
		confirm: function() {
			$('#shareGif').data('kendoMobileButton').bind('click', function() {
				app.navigate('#share');
				$(app.pane.loader.element).find('h1').text('Uploading...');
				var container = $('#share-results-container').addClass('loading');
				app.showLoading();
				setTimeout(function() {
					uploadGif().then(function(data) {
						window.models.share.set("url", data.result.Uri);
						app.hideLoading();
						container.removeClass('loading');
					}); 
				}, 3000);
			});    
		}    
	}

	$(document)
		.on('click', '#images button', removeImage)
		.on('focus', 'input', function() {
			// See http://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari#answer-7436574
			var self = this;
			setTimeout(function() {
				self.setSelectionRange(0, 9999);
			});
		})
		.on('click', '#viewOnline', function(event) {
			event.preventDefault();
			window.open($(this).attr('href'), '_blank');
		});

	window.models = {};
	window.models.share = (function() {
		var viewModel = kendo.observable({
			url: "",
			events: {
				share: function(e) {
					window.plugins.social.share("#gifthyself", null, viewModel.get("url"));
				},
				view: function(e) {
					window.open(viewModel.get("url"), '_blank');
				}
			},
			support: {
				sharing: function() {
					return window.app.os.ios;
				}
			}
		});

		return viewModel;
	}());

}());