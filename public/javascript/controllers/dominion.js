window.Dominion_Controller = Backbone.Controller.extend({
	routes: {
		'options': 'showOptions',
		'deck/:set': 'showDeck',
		'sets': 'showSetsList',
		'*default': 'defaultAction'
	},
	initialize: function(options) {
		_(this).bindAll(
			'showOptions',
			'showDeck',
			'showSetsList',
			'defaultAction'
			);
		this.library = new Library_Collection(window.LIBRARY);
	},
	showOptions: function() {
		var options = new Options_View();
	},
	showDeck: function(set) {
		var deck = new Deck_View({
			set: set
		});
	},
	showSetsList: function() {
		var sets = new Sets_View();
	},
	defaultAction: function(path) {
		this.showDeck();
	}
});
