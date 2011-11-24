window.DeckScroller_View = Backbone.View.extend({
	el: '#card-list',
	initialize: function() {
		_(this).bindAll();
		this.template = _.template($('#template-deck-scroller').html());
		this.template_card = _.template($('#template-card').html());
	},
	render: function(info, iscroll) {
	  if( info.deck ) {
		  info.deck.orderBy(window.options.get('sort'));
      if( info.black_market ) {
        info.black_market.orderBy(window.options.get('sort'));
      }
    }

		$(this.el).html(this.template({
			options: window.options.toJSON(),
			card: this.template_card,
			error: info.error,
			deck: (info.deck ? info.deck.toJSON() : []),
			bane: (info.deck && info.deck.bane ? info.deck.bane.toJSON() : null),
			blackMarket: (info.deck && info.deck.black_market ? info.deck.black_market.toJSON() : null)
		}));
		if( iscroll ) {
			setTimeout(function() { iscroll.refresh(); }, 0);
		}
	}
});
