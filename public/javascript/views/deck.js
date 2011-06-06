window.Deck_View = Base_View.extend({
	id: 'deck',
	deck: null,
	events: {
		'click .newSet': 'newDeck'
	},
	init: function(options) {
		if( 'new' === options.set ) {
			this.generateDeck();
		}
		else {
			this.loadDeck(options.set);
		}
		_(this).bindAll(
			'newDeck',
			'generateDeck',
			'loadDeck'
		);
		_(options).extend({
			template: '#template-deck'
		});
	},
	newDeck: function(e) {
		this.generateDeck();
		e.preventDefault();
	},
	generateDeck: function() {
		console.log('[ generating deck ]');
	},
	loadDeck: function(deck) {
		console.log('[ loading deck: '+deck+']');
	}
});
