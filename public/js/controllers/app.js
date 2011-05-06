window.Dominion = Backbone.Controller.extend({
	routes: {
		'deck/:name': 'loadDeck',
		'options': 'showOptions'
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
	},
	loadDeck: function() {
		//
	},
	showOptions: function() {
		var options = new Options_View();
	}
});
