window.Options_View = Backbone.View.extend({
	id: 'options',
	events: {
		'change input': 'updateOption',
		'change select': 'updateOption'
	},
	initialize: function(options) {
		_(this).bindAll(
			'render',
			'updateOption'
		);
		this.template = _.template($('#template-options').html());
		this.render();
	},
	render: function() {
		$(this.el).html(this.template({
			options: window.options.toJSON(),
			backTarget: window.app.backTarget,
			constants: window.options.constants
		}));
		$('#content').html(this.el);
	},
	updateOption: function(e) {
		var $field = $(e.currentTarget);
		console.log('[set: '+$field.attr('name')+' to: '+$field.val()+']');
		window.options.updateSetting($field.attr('name'), $field.val());
	},
});
