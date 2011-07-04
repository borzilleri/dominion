window.Options_View = Backbone.View.extend({
	id: 'options-scroller',
  className: 'content',
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
    $('.scroll-wrapper').hide();
		$('#options-wrapper').html(this.el).show();
    $(':checkbox').iphoneStyle();
		this.scroller = new iScroll('options-wrapper', {
      hScroll: false
    });
	},
	updateOption: function(e) {
		var $field = $(e.currentTarget),
		    name = $field.attr('name'),
		    value = $field.val();
		console.log('[ changed: '+name+' : '+value+' ]');

		var success = window.options.updateSetting(name, value);

		if( 'sets' === name ) {
		  this.$('[data-set="'+value+'"] input')
		    .prop('disabled', !$field.prop('checked'));
    }
    else if( 'promos' ===  name ) {
      this.$('[data-promos="'+value+'"] input')
        .prop('disabled', !$field.prop('checked'));
    }
    return false;
	},
});
