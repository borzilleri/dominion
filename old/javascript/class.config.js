var config = (function() {
	/** PRIVATE PROPERTIES **/
	var
		api = {},
		defaults = CONFIG_DEFAULTS,
		cache = {}

	/** PRIVATE METHODS **/

	function setForm_checkbox(name, value) {
		// Check to see if this is a single-value setting, or multi-value
		if( value instanceof Array) {
			// It's a multi-valued setting
			$('input[name="'+name+'"]').each(function() {
				$(this).attr('checked', (0 <= value.indexOf($(this).attr('value'))));
				$('#'+$(this).attr('id')+'_Options').toggle($(this).attr('checked'));
			});
		}
		else {
			$('input[name="'+name+'"]').attr('checked', Boolean(value));
			$('#'+$('input[name="'+name+'"]').attr('id')+'_Options').toggle(Boolean(value));
		}
	}
	function setForm_radio(name, value) {
		$('#ConfigWindow input[name="'+name+'"][value="'+value+'"]').attr('checked','checked');
	}
	function setForm_text(id, value) {
		$('#'+id).attr('value', value);
	}
	function setForm_number(id, value) {
		setForm_text(id,value);
	}

	function cacheFormValue_checkbox(field) {
		var fieldName = $(field).attr('name');
		var fieldValue = $(field).attr('value');
		var set = Boolean($(field).attr('checked'));

		// Check to see if this is a single or multiple valued checkbox.
		if( fieldName === fieldValue ) {
			// Our field name equals our field value, this is a single value setting
			cache[fieldName] = set
		}
		else {
			// Otherwise, we're a multi-value setting
			if( !(fieldName in cache) ) {
				cache[fieldName] = api.get(fieldName);
			}
			// Are we adding the value or removing it?
			if( !set ) cache[fieldName].splice(cache[fieldName].indexOf(fieldValue),1);
			else if( -1 == $.inArray(fieldValue,cache[fieldName]) ) {
				cache[fieldName].push(fieldValue);
			}
		}
		$('#'+$(field).attr('id')+'_Options').toggle(set);
	}

	function cacheFormValue_text(field) {
		cache[$(field).attr('name')] = $(field).attr('value');
	}
	function cacheFormValue_number(field) {
		cacheFormValue_text(field)
	}

	function cacheFormValue_radio(field) {
		cacheFormValue_text(field);
		$('#'+$(field).attr('name')+'_Options').toggle(Boolean($(field).attr('checked')));
	}

	/** PUBLIC METHODS **/
	api.get = function(key) {
		var value = store.get(key);
		if( undefined === value ) return null;

		return JSON.parse(store.get(key));
	}

	api.set = function(key, value) {
		store.set(key, JSON.stringify(value));
	}

	api.updateConfigWindow = function() {
		cache = {};
		for( key in defaults ) {
			if( $('#ConfigWindow input[name="'+key+'"]').length > 0 ) {
				var setFormFunction = 'setForm_'+$('#ConfigWindow input[name="'+key+'"]').attr('type');
				eval(setFormFunction)(key, api.get(key));
			}
		}
	}

	api.saveSettings = function() {
		for(key in cache) {
			api.set(key, cache[key]);
		}
	}

	api.cacheSetting = function() {
		var cacheFormFunction = 'cacheFormValue_'+$(this).attr('type');
		eval(cacheFormFunction)(this);
	}

	// Initialization (Constructor)
	if( undefined !== defaults ) {
		for(key in defaults) {
			// Check to see if we have defaults set properly first.
			var value = api.get(key);
			if( undefined === value || null === value ) {
				value = defaults[key];
				api.set(key, value);
			}
		}
	}

	// End Initialization

	return api;
})();

