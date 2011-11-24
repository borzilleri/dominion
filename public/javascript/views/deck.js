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
	initialize: function(options) {
		_(this).bindAll();
		this.loadDeck(options.deck);

		this.template = _.template($('#template-deck').html());
		//this.template_card = _.template($('#template-card').html());

		this.render();
	},
	renderDeck: function() {
		// Really, this is a convenience method to let us
		// render the scroller view
		this.scrollerView.render({error: this.error, deck: this.deck},this.iscroll);
		this.$('h1').text(this.deck?(this.deck.name?this.deck.name:'Generated Deck'):'');
		return this;
	},
	render: function(refresh) {
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
		var deck = new Deck_Collection();
		try {
			deck.generate();
			this.deck = deck;
			this.error = null;
		}
		catch( error ) {
			this.deck = null;
			this.error = error;
		}
		this.renderDeck();
		return false;
	},
	loadDeck: function(name, norender) {
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
