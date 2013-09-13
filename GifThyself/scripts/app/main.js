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
        function generateQuickGuid() {
            return Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
        };
        
        function uploadGif(data) {
            var file = {
                Filename: generateQuickGuid() + '.gif',
                ContentType: 'image/gif',
                base64: data
            };
            el.Files.create(file,
                function(data) {
                    alert('ok ' + JSON.stringify(data));
                    console.log(data.Result.Uri);
                },
                function(error) {
                    alert('fail ' + JSON.stringify(data));                            
                }
            );
        };
        
        function renderImageInCanvas(image, canvas) {
            var mpImg = new MegaPixImage(image),
                canvas = canvas || document.createElement('canvas');
            
            mpImg.render(canvas, { maxWidth: 200, maxHeight: 200, orientation: 6 });
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
            
            var binaryGif = encoder.stream().getData(),
                dataUrl = 'data:image/gif;base64,' + encode64(binaryGif);
            
            // Upload the gif to Everlive
            uploadGif(binaryGif);

            $('<img>').attr('src', dataUrl).load(function() {
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
        
        $('#getPicture').on('click', getPicture);
        $('#images').on('click', 'button', removeImage);
        $('#buildGif').on('click', function() {
            if (checkForImages()) {
                app.navigate('#preview');
                $(app.pane.loader.element).find('h1').text('Building...');
                $('#preview-container').addClass('loading');
                app.showLoading();
                setTimeout(buildGif, 3000);   
            }
        });
    }());
}());






