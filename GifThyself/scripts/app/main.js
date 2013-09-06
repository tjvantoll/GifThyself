(function () {
    'use strict';

    // global error handling
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
 
    var applicationSettings = {
        emptyGuid: '00000000-0000-0000-0000-000000000000'
    };

    // initialize Everlive SDK
    window.el = new Everlive({
        apiKey: 'oFGC6drHAMPPmAwG',
        masterKey: '!#Masterkey#!'
    });

    window.app = new kendo.mobile.Application(document.body, { transition: 'slide' });
    
    /*
	context.fillStyle = 'rgb(255,255,255)';
    context.fillRect(0, 0, canvas.width, canvas.height); // GIF can't do transparent so do white
	context.fillStyle = 'rgb(200, 0, 0)';
    context.fillRect (10, 10, 75, 50); // draw a little red box
    
   
	context.fillStyle = "rgb(200, 100, 100)";
    context.fillRect (10, 40, 75, 50); // draw another box
    
    encoder.addFrame(context);
    encoder.finish();

    var binaryGif = encoder.stream().getData(),
		dataUrl = 'data:image/gif;base64,' + encode64(binaryGif),
        gif = $('<img />').attr('src', dataUrl);
    
    $('button').after(gif);
    */
    
    $('#getPicture').on('click', function() {
        navigator.camera.getPicture(function(data) {
            var image = $('<img class="thumbnail">');
			image.attr('src', 'data:image/jpeg;base64,' + data);
            $('#images').append(image);
        }, function(message) {
            alert('fail: ' + message);
        }, {
            destinationType: Camera.DestinationType.DATA_URL
        });
    });
    
    $('#buildGif').on('click', function() {
        var encoder = new GIFEncoder(),
            canvas = document.querySelector('canvas'),
            context = canvas.getContext('2d');
    
        encoder.setRepeat(0);
        encoder.setDelay(200);

        encoder.start();
        
        // Add images     
        $('#images img').each(function() {
			var mpImg = new MegaPixImage(this);
            mpImg.render(canvas, { maxWidth: 200, maxHeight: 200, orientation: 6 });
            
//            var proportionalHeight = this.height * (200 / this.width);
//            context.drawImage(this, 0, 0, 200, proportionalHeight);
            encoder.addFrame(context);
        });

        encoder.finish();
        
	    var binaryGif = encoder.stream().getData(),
			dataUrl = 'data:image/gif;base64,' + encode64(binaryGif),
        	gif = $('<img>').attr('src', dataUrl);
    
	    $(this).after($('<img src="' + dataUrl + '">'));
    });
}());






