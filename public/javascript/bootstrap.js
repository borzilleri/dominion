$(function() {
  window.options = new Config_Model();
  window.app = new Dominion_Controller();
  Backbone.history.start();
});
