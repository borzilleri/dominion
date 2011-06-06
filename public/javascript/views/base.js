window.Base_View = Backbone.View.extend({
	initialize: function(options) {
		if( !(options && 'object' === typeof options) ) options = {};
		_(this).bindAll('render','init');
		this.init(options);

		if( options.template ) {
			this.template = _.template($(options.template).html());
			this.render();
		}
	},
	init: function(options) {
	},
	render: function() {
		$(this.el).html(this.template({}));
		$('#content').html($(this.el));
	}
});

