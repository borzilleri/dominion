window.List_View = Backbone.View.extend({
	el: '#list',
	iscroll: null,
	events: {
		'click li': 'loadDeck'
	},
	initialize: function(options) {
		_(this).bindAll();
		this.template = _.template($('#template-list').html());
		this.render();
	},
	render: function() {
		var self = this;

		$(this.el).html(
			this.template(
				{
					generated: !_(app.generatedDeck).isNull(),
					generatedSets: app.generatedDeck ? app.generatedDeck.getSetData() : '',
					current: (app.currentDeck && app.currentDeck.name ? app.currentDeck.name : null),
					currentSets: app.currentDeck ? app.currentDeck.getSetData() : ''
				}
			)
		);
		if( !this.iscroll ) {
			this.iscroll = new iScroll('list-wrapper', {
					hScroll: false
			});
		}
		else {
			setTimeout(function() { self.iscroll.refresh(); }, 0);
		}
	},
	loadDeck: function(e) {
		var deck = $(e.currentTarget).data('deck');
		app.navigate('deck/'+deck, true);
		return false;
	}
});

