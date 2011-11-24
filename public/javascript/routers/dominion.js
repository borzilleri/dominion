window.Dominion_Router = Backbone.Router.extend({
	lastDeck: null,
	backTarget: null,
	routes: {
		'options': 'showOptions',
		'deck/:set': 'showDeck',
		'list': 'showList',
		'*default': 'defaultAction'
	},
	initialize: function(options) {
		_(this).bindAll();
		window.library = new Library_Collection(window.DATA_CARDS);

		this.optionsView = new Options_View();
		this.deckView = new Deck_View({
				deck: 'last'
		});
	},
	showPanelView: function(view) {
		$('.panel').hide();
		$(view.el).show();
	},
	showOptions: function() {
		if( !this.optionsView ) {
			this.optionsView = new Options_View();
		}
		this.showPanelView(this.optionsView);
	},
	showDeck: function(name) {
		if( !this.deckView ) {
			this.deckView = new DeckView({deck: name});
		}
		this.deckView.loadDeck(name);
		this.showPanelView(this.deckView);
	},
	showList: function() {
		if( !this.listView ) {
			this.listView = new List_View();
		}
		this.showPanelView(this.listView);
	},
	defaultAction: function(path) {
		this.showDeck();
	}
});
