window.Deck_View = Backbone.View.extend({
	el: '#deck',
	deck: null,
	error: null,
	nav: null,
	iscroll: null,
	events: {
		//'click .deck li': 'selectCard',
		//'click .replace-card': 'replaceCard'
	},
	initialize: function() {
		_(this).bindAll();
		this.template = _.template($('#template-deck').html());
		this.render();
	},
	render: function() {
		var self = this;

		$(this.el).html(this.template());
		if( !this.scrollerView ) {
			this.scrollerView = new DeckScroller_View();
		}
		this.renderDeck();

		this.iscroll = new iScroll('deck-wrapper', {
				hScroll: false,
				pullToRefresh: 'down',
				onPullDown: function() { self.newDeck(); }
		});
		this.scrollerView.iscroll = this.iscroll;
		return this;
	},
	renderDeck: function() {
		// This method wraps the scrollerView.render method
		// in order to properly set the page's h1.
		this.scrollerView.render();

		var deck = _.isUndefined(window.app) ? null : app.currentDeck;
		this.$('h1').text( deck ? deck.name : '' );
		return this;
	},
	selectCard: function(e) {
		var $li = $(e.currentTarget);
		var $selected = $li.closest('div').find('.selected');
		if( 0 != $selected.length ) {
			$selected.removeClass('selected');
		}
		else {
			$li.addClass('selected');
		}
		return false;
	},
	replaceCard: function(e) {
		return false;
	},
	newDeck: function(e) {
		app.generatedDeck = new Deck_Collection();
		try {
			app.generatedDeck.generate();
		}
		catch( error ) {
			console.log('Error Generating Deck: '+error);
		}
		app.currentDeck = app.generatedDeck;
		this.renderDeck();
		return false;
	},
	loadDeck: function(name, norender) {
		// DEPRECATED
		if( !name || 'last' == name ) {
			// TODO
			// Uh, fix this?
			this.deck = null;
			return;
		}

		var deck = new Deck_Collection();
		try {
			deck.load(name);
			this.deck = deck;
			this.error = null;
		}
		catch( error ) {
			this.deck = null;
			this.error = error;
		}
		if( !norender ) {
			this.renderDeck();
		}
		return this;
	}
});
