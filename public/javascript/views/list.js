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
    var toDirection, fromDirection,
        fromId = $('.scroll-wrapper:visible').attr('id');
    if( 'deck-wrapper' == fromId ) {
      toDirection = 'left';
      fromDirection = 'right';
    }
    else {
      toDirection = 'right';
      fromDirection = 'left';
    }

    if( $('#list-wrapper').hasClass('offscreen-'+toDirection) ) {
      $('#list-wrapper')
        .removeClass('offscreen-'+toDirection)
        .addClass('offscreen-'+fromDirection);
    }

    $(this.el).html(this.template());
    $('.scroll-wrapper:visible').addClass('offscreen-'+toDirection).hide();
    $('#list-wrapper')
      .find('.scroller').html(this.el)
      .parent().show().removeClass('offscreen-'+fromDirection);
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

