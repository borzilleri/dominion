window.Deck_View = Backbone.View.extend({
	id: 'deck',
	deck: new Library_Collection(),
	events: {
		'click .newSet': 'newDeck'
	},
	initialize: function(options) {
		if( 'new' === options.set ) {
			this.generateDeck();
		}
		else {
			this.loadDeck(options.set);
		}
		_(this).bindAll(
			'render',
			'output',
			'newDeck',
			'generateDeck',
			'loadDeck'
		);

		this.template = _.template($('#template-deck').html());
		this.render();
		this.output();
	},
	render: function() {
		$(this.el).html(this.template({
			set: this.deck.toJSON()
		}));
	},
	output: function() {
		$('#content').html($(this.el));
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
		this.deck.sortByName();
	},
	loadDeck: function(deck) {
		console.log('[ loading deck: '+deck+']');
	}
});
