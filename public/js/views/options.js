window.Options_View = Base_View.extend({
	tagName: 'form',
	id: '#options-content',
	initialize: function(options) {
		this.template = _.template($('#template-options').html());
		Base_View.prototype.call(this,options);
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
