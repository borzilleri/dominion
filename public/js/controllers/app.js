window.Dominion = Backbone.Controller.extend({
	routes: {
		'decks': 'showDecks',
		'options': 'showOptions',
		'deck/:name': 'loadDeck',
		'home': 'newDeck'
	},
	initialize: function(options) {
		_(this).bindAll(
			'setupView',
			'loadDeck',
			'showOptions'
		);
		_.extend(this,options);

		this.setupView();
		Backbone.history.start();

		$('a.newDeck').live('click', this.newDeck);
	},
	setupView: function() {
		this.options = {};
		this.deck = {};
	},
	newDeck: function(e, ui) {
		$(e.currentTarget).removeClass('ui-btn-active');
		if( !$('#home').hasClass('ui-page-active') ) {
			$.mobile.changePage("#home", "slide", true);
		}

		var deck = new Deck_View();
	},
	loadDeck: function() {
		//
		alert('displaying a deck');
	},
	showDecks: function() {
		//
		alert('listing decks');
	},
	showOptions: function() {
		var options = new Options_View();
	}
});
