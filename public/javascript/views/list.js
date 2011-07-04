window.List_View = Backbone.View.extend({
	id: 'list-scroller',
  className: 'content',
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
    $('.scroll-wrapper').hide();
    $('#list-wrapper').html($(this.el)).show();
    this.scroller = new iScroll('list-wrapper', {
      hScroll: false
    });
  },
  loadDeck: function(e) {
    var deck = $(e.currentTarget).data('deck');
    window.location.hash = "#deck/"+deck;
    return false;
  }
});

