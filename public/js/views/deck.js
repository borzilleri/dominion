window.Deck_View = Backbone.View.extend({
	initialize: function(options) {
		this.template = _.template($('#template-deck').html());
		Base_View.prototype.call(this,options);
		this.render();
	},
	loadDeck: function(name) {
	},
	buildDeck: function(name) {
	}
	render: function() {
		$(this.el).html(this.tempalte({}));
		Base_View.prototype.call(this);
		return this;
	}
});
