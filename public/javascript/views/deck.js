window.Deck_View = Backbone.View.extend({
	id: 'scroller',
	deck: null,
  error: null,
	events: {
		'click .newSet': 'newDeck',
	  'pullDown': 'newDeck'
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
	render: function() {
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
	},
	output: function() {
		$('div.content').html(this.el);

		setTimeout(function() {
		  if( window.myScroll ) {
		    window.myScroll.destroy();
		    window.myScroll = null;
      }
      window.myScroll = new iScroll('scrollWrapper', {
        hScroll: false,
        pullToRefresh: 'down',
        pullDownLabel: [
        'Pull Down to randomize...',
        'Release to randomize...',
        'Randomizing...'
        ]
      });
    }, 0);
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
		this.render();
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
