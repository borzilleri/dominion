window.Dominion_Controller = Backbone.Controller.extend({
	library: null,
	lastDeck: null,
	backTarget: null,
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
		var options = new Options_View(this.backTarget);
	},
	showDeck: function(set) {
		this.backTarget = '#deck';
		var deck = new Deck_View({
			set: set
		});
	},
	showSetsList: function() {
		this.backTarget = '#sets';
		var sets = new Sets_View();
	},
	defaultAction: function(path) {
		this.showDeck();
	}
});
