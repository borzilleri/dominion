window.Options_View = Backbone.View.extend({
	el: '#options',
	events: {
		'change input': 'updateOption',
		'change select': 'updateOption'
	},
	initialize: function(options) {
		_(this).bindAll();
		this.template = _.template($('#template-options').html());
		this.render();
	},
	render: function() {
		$(this.el).html(this.template({
			options: window.options.toJSON(),
			constants: window.options.constants
		}));

    $(':checkbox').iphoneStyle();
		this.iscroll = new iScroll('options-wrapper', {
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
