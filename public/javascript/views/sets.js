window.Sets_View = Base_View.extend({
	id: 'sets',
	init: function(options) {
		_(options).extend({
			template: '#template-sets'
		});
	}
});

