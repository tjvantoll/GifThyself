(function () {
    'use strict';

    /******************************************************************/
    // global error handling
    /******************************************************************/
    /* var showAlert = function(message, title, callback) {
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
    }); */
 
    
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
  
	window.app = new kendo.mobile.Application(document.body, { 
            transition: 'slide', 
            skin: "flat"
    });
    
    document.addEventListener("deviceready", function () {
    	// Setup the Kendo UI Mobile Application
        /* global.app = new kendo.mobile.Application(document.body, { 
            transition: 'slide', 
            initial: "#share",
            skin: "flat",
            init: function() {
                console.log("initialized");
            }
        });*/
    }, false);
}());






