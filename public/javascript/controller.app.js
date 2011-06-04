window.App_Controller = Backbone.Controller.extend({
  initialize: function(options) {
    this.route('options', this.showOptions);
    _(this).bindAll('showOptions','showDeck');
  },
  showOptions: function() {
    alert('opts');
  },
  showDeck: function() {
    alert('deck');
  }
});
