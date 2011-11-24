window.Config_Model = Backbone.Model.extend({
	localStorage: new Store('config'),
	constants: {
		blackmarket_max: 200,
		sort_fields: ['name','set','cost']
	},
	defaults: {
		// Included Sets
		sets: {
			Dominion: true,
			Intrigue: true,
			Seaside: true,
			Alchemy: true,
			Prosperity: true,
			Cornucopia: true
		},
		promos: {
			'Black Market': false,
			'Envoy': false,
			'Stash': false
		},
		// Card Rules
		blackmarket_size: 15,
		// Set Rules
		alchemy_min: 3,
		alchemy_max: 5,
		prosperity_random_basics: true,
		// Card Selection Rules
		require_defense: true,
		// Display settings
		display: {
			set: true,
			cost: false,
			type: true
		},
		sort: 'name'
	},
	initialize: function(options) {
		_(this).bindAll();
		if( options && options.librarySize ) {
			this.constants.blackmarket_max = options.librarySize;
		}
		//Backbone.Model.prototype.initialize.call(this,this.defaults_opts);
		this.fetch();
	},
	parse: function(resp) {
		return resp[0] ? resp[0] : resp;
	},
	updateSetting: function(key, val) {
		var attr = {};
		if( 'sets' === key || 'promos' === key || 'display' === key ) {
			// key is an object attribute
			// val is a boolean property of key to toggle
			attr = this.get(key);
			attr[val] = !(attr[val]);
		}
		else if( 'require_defense' === key || prosperity_random_basics === 'key' ) {
			// key is a boolean attribute to toggle
			// val is irrelevant
			attr[key] = !(this.get(key));
		}
		else {
			// The "key" is the attribute to set,
			// and "val" is the value to set it to
			attr[key] = val;
		}
		this.set(attr);
		this.save();
	}
});

