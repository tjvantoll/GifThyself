(function () {
    'use strict';

    /******************************************************************/
    // global error handling
    /******************************************************************/
    var showAlert = function(message, title, callback) {
        window.alert(message, callback || function () {}, title, 'OK');
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
    
    document.addEventListener("deviceready", function () {
    	// Setup the Kendo UI Mobile Application
	    window.app = new kendo.mobile.Application(document.body, { transition: 'slide' });
		window.imageInit();
    }, false);
}());






