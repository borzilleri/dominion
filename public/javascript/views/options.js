window.Options_View = Base_View.extend({
	id: 'options',
	init: function(options) {
		_(options).extend({
			template: '#template-options'
		});
	}
});
