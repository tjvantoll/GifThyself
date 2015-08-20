(function(g) {
  var productId = "7c3fff82d9b447408e6632c970233ce8"; // App unique product key
  // Make analytics available via the window.analytics variable
  // Start analytics by calling window.analytics.Start()
  var analytics = g.analytics = g.analytics || {};
  analytics.Start = function()
  {
    // Handy shortcuts to the analytics api
    var factory = window.plugins.EqatecAnalytics.Factory;
    var monitor = window.plugins.EqatecAnalytics.Monitor;
    // Create the monitor instance using the unique product key for GifThyself Analytics
    var settings = factory.CreateSettings(productId);
    settings.LoggingInterface = factory.CreateTraceLogger();
    factory.CreateMonitorWithSettings(settings,
      function() {
        console.log("Monitor created");
        // Start the monitor inside the success-callback
        monitor.Start(function() {
          console.log("Monitor started");
        });
      },
      function(msg) {
        console.log("Error creating monitor: " + msg);
      });
  }
  analytics.Stop = function()
  {
    var monitor = window.plugins.EqatecAnalytics.Monitor;
    monitor.Stop();
  }
  analytics.Monitor = function()
  {
    return window.plugins.EqatecAnalytics.Monitor;
  }    
})(window);