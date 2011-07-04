window.Deck_View = Backbone.View.extend({
	id: 'deck-scroller',
  className: 'content',
	deck: null,
  error: null,
	events: {
		'click .newDeck': 'newDeck'
	},
	initialize: function(options) {
		_(this).bindAll(
			'render',
			'output',
			'newDeck',
			'loadDeck'
		);
		this.loadDeck(options.deck);
		this.template = _.template($('#template-deck').html());
		this.template_card = _.template($('#template-card').html());
		this.render();
		this.output();
	},
	render: function(refresh) {
	  var self = this;
	  if( this.deck ) {
		  this.deck.orderBy(window.options.get('sort'));
      if( this.deck.black_market ) {
        this.deck.black_market.orderBy(window.options.get('sort'));
      }
    }
		$(this.el).html(this.template({
      card: this.template_card,
			options: window.options.toJSON(),
			error: this.error,
			deck: (this.deck ? this.deck.toJSON() : []),
			bane: (this.deck && this.deck.bane ? this.deck.bane.toJSON() : null),
		  blackMarket: (this.deck && this.deck.black_market ? this.deck.black_market.toJSON() : null)
		}));

		if( refresh ) {
		  setTimeout(function() { self.scroller.refresh(); }, 0);
    }
	},
	output: function() {
    var self = this;
    $('.scroll-wrapper').hide();
		$('#deck-wrapper').html(this.el).show();
		this.scroller = new iScroll('deck-wrapper', {
      hScroll: false,
      pullToRefresh: 'down',
      onPullDown: function() { self.newDeck(); }
    });
	},
	newDeck: function(e) {
		var deck = new Deck_Collection();
		try {
		  deck.generate();
      this.deck = deck;
      this.error = null;
    }
		catch( error ) {
		  this.deck = null;
		  this.error = error;
    }
		this.render(true);
		return false;
	},
	loadDeck: function(name) {
		if( !name || 'last' == name ) {
			this.deck = window.app.lastDeck;
			return;
		}

    var deck = new Deck_Collection();
    try {
      deck.load(name);
      this.deck = deck;
      this.error = null;
    }
    catch( error ) {
      this.deck = null;
      this.error = error;
    }
	}
});
