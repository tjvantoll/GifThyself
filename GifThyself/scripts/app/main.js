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
        function renderImageInCanvas(image, canvas) {
            var mpImg = new MegaPixImage(image),
                canvas = canvas || document.createElement('canvas');
            
            mpImg.render(canvas, { maxWidth: 200, maxHeight: 200, orientation: 6 });
            return canvas;
        };
        
        function getPicture() {
            navigator.camera.getPicture(function(data) {      
                var canvas,
                    image = $('<img>');
    
                image.attr('src', 'data:image/jpeg;base64,' + data);
                canvas = renderImageInCanvas(image[0]);
    
                $('#images').append(canvas);
                $('#images').append(image);
            }, function(message) {
                alert('Image add failed: ' + message);
            }, {
                destinationType: Camera.DestinationType.DATA_URL
            });  
        };
        
        function buildGif() {
			app.navigate('#preview');
            app.showLoading('Building your gif...');
            
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

            $('<img>').attr('src', dataUrl).load(function() {
				$('#result').html(this);
                app.hideLoading();
            });
        };
        
        $('#getPicture').on('click', getPicture);
        $('#buildGif').on('click', buildGif);
    }());
}());






