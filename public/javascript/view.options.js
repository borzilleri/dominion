window.Options_View = Backbone.View.extend({
  el: $('#ConfigWindow'),
  events: {
    'click #showConfig': 'showOptions',
  },
  initialize: function(options) {
    _(this).bindAll('showOptions');
  },
  showOptions: function(e) {
    $(this.el).show();
    e.preventDefault();
  }
});
