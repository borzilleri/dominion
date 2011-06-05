window.Options_View = Backbone.View.extend({
	id: 'options',
  events: {
  	'click .cancel': 'close',
		'click .save': 'save'
  },
	initialize: function(options) {
		_(this).bindAll('render');
		this.template = _.template($('#template-options').html());
		this.render();
	},
	render: function() {
		$(this.el).html(this.template({})).appendTo($('#content'));
	},
	close: function(e) {
		window.location.hash = '';
		e.preventDefault();
	},
	save: function(e) {
		this.close(e);
	}
});
