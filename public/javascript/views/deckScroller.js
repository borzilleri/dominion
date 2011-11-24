window.DeckScroller_View = Backbone.View.extend({
	el: '#card-list',
	iscroll: null,
	initialize: function() {
		_(this).bindAll();
		this.template = _.template($('#template-deck-scroller').html());
		this.template_card = _.template($('#template-card').html());
	},
	render: function() {
		var self = this,
				deck = _.isUndefined(window.app) ? null : window.app.currentDeck;

		if( deck ) {
			deck.orderBy(window.options.get('sort'));
			if( deck.black_market ) {
				deck.black_market.orderBy(window.options.get('sort'));
			}
		}

		$(this.el).html(
			this.template(
				{
					options: window.options.toJSON(),
					card: this.template_card,
					deck: ( deck ? deck.toJSON() : {} ),
				}
			)
		);

		if( this.iscroll ) {
			setTimeout(function() { self.iscroll.refresh(); }, 0);
		}
	}
});
