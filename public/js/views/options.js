window.Options_View = Backbone.View.extend({
	tagName: 'form',
	className: '',
	id: '#options-content',
	template: null,
	initialize: function(options) {
		_(this).bindAll(
			'render'
		);
		this.template = _.template($('#template-options').html());

		this.render();
	},
	render: function() {
		return this;
		$(this.el).html(this.template({}));

		$('div[data-role="page"].ui-page-active')
			.find('div[data-role="content"]').html(this.el);
		return this;
	}
});
