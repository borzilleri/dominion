window.App_Controller = Backbone.Controller.extend({
	routes: {
		'options': 'showOptions',
		'*default': 'defaultAction'
	},
  initialize: function(options) {
    _(this).bindAll(
    	'showOptions',
    	'defaultAction'
    );
    _(this
    this.library = new Library_Collection(window.LIBRARY);
  },
  showOptions: function() {
  	var options = new Options_View();
  },
	defaultAction: function(path) {
		$('#content').empty();
	}
});
