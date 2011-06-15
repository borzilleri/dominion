window.Deck_View = Backbone.View.extend({
	id: 'deck',
	deck: null,
	events: {
		'click .newSet': 'newDeck'
	},
	initialize: function(options) {
		_(this).bindAll(
			'render',
			'output',
			'newDeck',
			'generateDeck',
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
			options: window.options.toJSON()
		}));
	},
	output: function() {
		$('#content').html(this.el);
	},
	newDeck: function(e) {
		this.generateDeck();
		this.render();
		e.preventDefault();
	},
	generateDeck: function() {
		console.log('[ generating deck ]');
		this.deck = new Library_Collection();
		this.deck.generate();
	},
	loadDeck: function(deck) {
		if( !deck || 'last' == deck ) {
			console.log('[ loading last deck ]');
			this.deck = window.app.lastDeck;
		}
		else {
		  this.deck = new Library_Collection();
		  this.deck.load(deck);
		}
	}
});
