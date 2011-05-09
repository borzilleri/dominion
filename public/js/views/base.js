window.Base_View = Backbone.View.extend({
	tagName: 'ul',
	className: '',
	id: '',
	template: null,
	initialize: function() {
		_(this).bindAll('render');
	},
	render: function() {
		$('div[data-role="page"].ui-page-active')
			.find('div[data-role="content"]').html(this.el);
	}
});
