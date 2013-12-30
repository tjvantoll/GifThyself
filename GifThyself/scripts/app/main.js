(function () {
    "use strict";

    /******************************************************************/
    // global error handling
    /******************************************************************/
    /*var showAlert = function(message, title, callback) {
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
    });*/

    // initialize Everlive SDK
    window.el = new Everlive( "oFGC6drHAMPPmAwG" );
  
    document.addEventListener( "deviceready", function () {
        window.app = new kendo.mobile.Application( document.body, { 
            transition: "slide", 
            skin: "flat",
            statusBarStyle: "black-translucent"
        });
        navigator.splashscreen.hide();
    }, false );
}());






