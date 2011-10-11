window.List_View = Backbone.View.extend({
  className: 'content',
  events: {
    'click li': 'loadDeck'
  },
  initialize: function(options) {
    _(this).bindAll();

    this.template = _.template($('#template-list').html());
    this.render();
  },
  render: function() {
    $(this.el).html(this.template());
    $('.scroll-wrapper').hide();
    $('#list-wrapper').find('.scroller').html(this.el).parent().show();
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

