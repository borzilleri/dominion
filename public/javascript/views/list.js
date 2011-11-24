window.List_View = Backbone.View.extend({
	el: '#list',
  events: {
    'click li': 'loadDeck'
  },
  initialize: function(options) {
    _(this).bindAll();
    this.template = _.template($('#template-list').html());
    this.render();
  },
  render: function() {
		$(this.el).html(this.template({
			recent: app.lastDeck && app.lastDeck.name ? app.lastDeck.name : null
		}));
    this.scroller = new iScroll('list-wrapper', {
      hScroll: false
    });
  },
  loadDeck: function(e) {
    var deck = $(e.currentTarget).data('deck');
    app.navigate('deck/'+deck, true);
    return false;
  }
});

