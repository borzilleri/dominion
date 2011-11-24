window.Dominion_Router = Backbone.Router.extend({
	generatedDeck: null,
	currentDeck: null,
	routes: {
		'options': 'showOptions',
		'deck/:set': 'loadDeck',
		'list': 'showList',
		'*default': 'defaultAction'
	},
	initialize: function(options) {
		_(this).bindAll();
		window.library = new Library_Collection(window.DATA_CARDS);
	},
	showPanelView: function(view) {
		$('.panel').hide();
		$(view.el).show();
	},
	defaultAction: function(path) {
		this.loadDeck();
	},
	showOptions: function() {
		if( !this.optionsView ) {
			this.optionsView = new Options_View();
		}
		this.showPanelView(this.optionsView);
	},
	loadDeck: function(name) {
		if( !name ) {
			if( !this.currentDeck && this.generatedDeck ) {
				this.currentDeck = this.generatedDeck;
			}
		}
		else if( 'last' === name ) {
			if( this.generatedDeck ) {
				this.currentDeck = this.generatedDeck;
			}
		}
		else {
			this.currentDeck = new Deck_Collection();
			try {
				this.currentDeck.load(name);
			}
			catch( error ) {
				console.log('Error Loading Deck: '+error);
			}
		}

		if( !this.deckView ) {
			this.deckView = new Deck_View();
		}
		else {
			this.deckView.renderDeck();
		}
		this.showPanelView(this.deckView);
	},
	showList: function() {
		if( !this.listView ) {
			this.listView = new List_View();
		}
		else {
			this.listView.render();
		}
		this.showPanelView(this.listView);
	}
});
