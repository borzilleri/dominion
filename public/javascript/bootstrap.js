$(function() {
  window.isMobile = (function(ua) {
    return (
      ua.match('/iPhone/') ||
      ua.match('/iPod/') ||
      ua.match('/iPad/') ||
      ua.match('/Android/')
    );
  })(navigator.userAgent);

  window.options = new Config_Model();
  window.app = new Dominion_Controller();
  Backbone.history.start();
});
