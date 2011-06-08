window.Options_View = Backbone.View.extend({
	id: 'options',
	initialize: function(options) {
		_(this).bindAll(
			'render'
		);
		this.template = _.template($('#template-options').html());
		this.render();
	},
	render: function() {
		$(this.el).html(this.template({
			backTarget: window.app.backTarget,
			options: {}
		}));
		$('#content').html(this.el);
	}
});
