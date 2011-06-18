window.Deck_View = Backbone.View.extend({
	id: 'deck',
	deck: null,
  error: null,
	events: {
		'click .newSet': 'newDeck'
	},
	initialize: function(options) {
		_(this).bindAll(
			'render',
			'output',
			'newDeck',
			'loadDeck'
		);

		this.loadDeck(options.set);
		this.template = _.template($('#template-deck').html());
		this.render();
		this.output();
	},
	render: function() {
		if( this.deck ) {
		  this.deck.orderBy(window.options.get('sort'));
    }
		$(this.el).html(this.template({
			set: (this.deck ? this.deck.toJSON() : []),
			options: window.options.toJSON(),
			error: this.error
		}));
	},
	output: function() {
		$('#content').html(this.el);
	},
	newDeck: function(e) {
		var deck = new Library_Collection();
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
	loadDeck: function(deck) {
		if( !deck || 'last' == deck ) {
			this.deck = window.app.lastDeck;
		}
		else {
		  this.deck = new Library_Collection();
		  this.deck.load(deck);
		}
	}
});
