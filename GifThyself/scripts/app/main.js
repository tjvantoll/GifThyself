(function () {
    'use strict';

    /******************************************************************/
    // global error handling
    /******************************************************************/
    var showAlert = function(message, title, callback) {
        navigator.notification.alert(message, callback || function () {
        }, title, 'OK');
    };
    var showError = function(message) {
        showAlert(message, 'Error occured');
    };
    window.addEventListener('error', function (e) {
        e.preventDefault();
        var message = e.message + "' from " + e.filename + ":" + e.lineno;
        showAlert(message, 'Error occured');
        return true;
    });
 
    
    /******************************************************************/
    // config
    /******************************************************************/
    var applicationSettings = {
        emptyGuid: '00000000-0000-0000-0000-000000000000'
    };

    // initialize Everlive SDK
    window.el = new Everlive({
        apiKey: 'oFGC6drHAMPPmAwG',
        masterKey: '!#Masterkey#!'
    });

    // Setup the Kendo UI Mobile Application
    window.app = new kendo.mobile.Application(document.body, { transition: 'slide' });
    
    
    /******************************************************************/
    // Image processing
    /******************************************************************/
    
    (function() {
        
        // Holder for the gif after it has been created but before it's uploaded.
		var base64EncodedGif;
        
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
                iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
            
            // See http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
            mpImg.render(canvas, { maxWidth: 200, maxHeight: 200, orientation: (iOS ? 6 : 1) });
            return canvas;
        };
        
        function getPicture() {
            navigator.camera.getPicture(function(data) {      
                var canvas,
                    image = $('<img>'),
                    imageContainer = $('<div>');
    
                image.attr('src', 'data:image/jpeg;base64,' + data);
                canvas = renderImageInCanvas(image[0]);
    
                imageContainer.append(canvas, image, $('<button>X</button>'));
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
        
        function resetApp() {
            $('#images').empty();
        };

        $('#buildGif').on('click', function() {
            if (checkForImages()) {
                app.navigate('#preview');
                $(app.pane.loader.element).find('h1').text('Building...');
                $('#preview-container').addClass('loading');
                app.showLoading();
                setTimeout(buildGif, 3000);   
            }
        });
        $('#shareGif').on('click', function() {
            closeConfirmationDialog();
			app.navigate('#share');
            $(app.pane.loader.element).find('h1').text('Uploading...');
            var container = $('#share-results-container').addClass('loading');
            app.showLoading();
            setTimeout(function() {
                uploadGif().then(function(data) {
                    var url = data.result.Uri;
                    container.find('input').val(url);
                    container.find('p a').attr('href', url);
					app.hideLoading();
                    container.removeClass('loading');
                }); 
            }, 3000);
        });
        
        $(document)
	        .on('click', '#getPicture', getPicture)
    	    .on('click', '#images button', removeImage)
        	.on('click', '.confirmation-cancel', closeConfirmationDialog)
        	.on('click', '#build-another', resetApp);
    }());
    
    /**
     * TODO: This is absolute insanity.
     *
     *   - How can I subscribe to an event in a non-declarative manner?
     *   - Why on iOS is the confirmation button automatically being clicked and I
     *     have to do this nonsense of disabling then enabling? Really I even need
     *     a setTimeout? Really!?
     */
    window.enableShare = function() {
        setTimeout(function() {
            $('#shareGif').prop('disabled', false);  
        });
    };
}());






