window.List_View = Backbone.View.extend({
	id: 'scroller',
  events: {
    'click li': 'loadDeck'
  },
  initialize: function(options) {
    _(this).bindAll('render','loadDeck');

    this.template = _.template($('#template-list').html());
    this.render();
  },
  render: function() {
    $(this.el).html(this.template());
    $('div.content').html($(this.el));
		setTimeout(function() {
		  if( window.myScroll ) {
		    window.myScroll.destroy();
		    window.myScroll = null;
      }
      window.myScroll = new iScroll('scrollWrapper', {
        hScroll: false
      });
    }, 0);
  },
  loadDeck: function(e) {
    var deck = $(e.currentTarget).data('deck');
    window.location.hash = "#deck/"+deck;
    return false;
  }
});

