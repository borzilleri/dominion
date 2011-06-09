window.Deck_View = Backbone.View.extend({
	id: 'deck',
	deck: new Library_Collection(),
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
		$(this.el).html(this.template({
			set: (this.deck ? this.deck.toJSON() : [])
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
		while( this.deck.length < 10 ) {
			var i = Math.floor(Math.random()*window.app.library.length);
			var model = window.app.library.at(i).clone();
			this.deck.add(model);
		}
		this.deck.orderBy('name');

		window.app.lastDeck = this.deck;
	},
	loadDeck: function(deck) {
		console.log('[ loading deck: '+deck+']');
		if( !deck || 'last' == deck ) {
			this.deck = window.app.lastDeck;
		}
		else {
			// load the named set
		}
	}
});
