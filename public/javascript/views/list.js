window.List_View = Base_View.extend({
	id: 'list',
	init: function(options) {
		_(options).extend({
			template: '#template-list'
		});
	}
});

