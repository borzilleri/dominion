window.Dominion_Controller = Backbone.Controller.extend({
	lastDeck: null,
	backTarget: null,
	routes: {
		'options': 'showOptions',
		'deck/:set': 'showDeck',
		'list': 'showList',
		'*default': 'defaultAction'
	},
	initialize: function(options) {
		_(this).bindAll(
			'showOptions',
			'showDeck',
			'showList',
			'defaultAction'
			);
		window.library = new Library_Collection(window.DATA_CARDS);
	},
	showOptions: function() {
		var options = new Options_View(this.backTarget);
	},
	showDeck: function(name) {
		this.backTarget = '#deck';
		var deck = new Deck_View({
      deck: name
		});
	},
	showList: function() {
		this.backTarget = '#list';
		var list = new List_View();
	},
	defaultAction: function(path) {
		this.showDeck();
	}
});
