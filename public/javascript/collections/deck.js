window.Deck_Collection = Card_Collection.extend({
  default_size: 10,
	name: null,
	error: '',
  bane: null,
  black_market: null,
  prosperity_basics: false,
  initialize: function() {
    _(this).bindAll();
  },
	toJSON: function() {
		var data = this.getSetData();
		return {
			error: this.error,
			name: this.name,
			prosperity: this.prosperity_basics,
			bane: this.bane ? this.bane.toJSON() : null,
			blackMarket: this.black_market ? this.black_market.toJSON() : null,
			cards: Card_Collection.prototype.toJSON.call(this),
			setClasses: data.classes,
			setSymbols: data.symbols
		};
	},
	getSetData: function() {
		var sets = [],
				data = {symbols:'',classes:''};

		this.each(function(card) {
			var set = card.get('set');
			if( -1 === _(sets).indexOf(set) ) {
				sets.push(set);
			}
		});

		sets.sort();
		data.classes = sets.join(' ');
		_(sets).each(function(name) {
			data.symbols += DATA_SETS[name].symbol;
		});

		return data;
	},
  load: function(deck) {
		// First, check the DATA_DECKS array to see if this
		// is a deck preset.
		if( deck in window.DATA_DECKS ) {
			this.loadPreset(deck);
		}
		else if( false ) {
			// Next, try to load this from LocalStorage
			// TODO: Implement this.
		}
		else {
			// If that didn't work, generate an error.
			this.error += "Deck '"+deck+"' not found.<br>";
		}

		if( this.error ) {
			throw this.error;
		}
  },
	loadPreset: function(deck) {
		var info = window.DATA_DECKS[deck],
				self = this;
		this.name = deck;
		_(info.cards).each(function(name) {
				var card = window.library.get(name);
				if( !card ) {
					this.error += "Card: '"+name+"' not found.<br>";
				}
				self.add(card);
		});
	},
  generate: function() {
  	// Generate a new deck
    var self = this,
        defenseRequired = false,
				defenseAdded = false,
				potCards = 0;
		this.name = 'Generated Deck';

    // If we're using Alchemy, select the min number of potion cards.
    if( window.options.get('sets').Alchemy ) {
      var pots = new Library_Collection(window.library.filter(function(model) {
        return model.get('potion');
      }));

      while( this.length < window.options.get('alchemy_min') ) {
        var model = pots.random();
        console.log('[ adding: '+model.get('name')+','+model.get('potion')+' ]');
        this.add(model);
        pots.remove(model);
        if( model.get('type').attack && window.options.get('require_defense') ) {
          defenseRequired = true;
        }
      }
    }

    potCards = this.length;

		try {

			// Then add the remaining number of cards, if any
			if( this.length < this.default_size ) {
				var selection = new Library_Collection(
					window.library.filter(function(model) { 
							return model.isSelectable() && !self.get(model.get('name'));
					})
				);

				while( this.length < this.default_size ) {
					// If we've maxed out our potion cards,
					// filter them out from the selection library
					if( potCards >= window.options.get('alchemy_max') ) {
						selection = new Library_Collection(selection.filter(function(model) {
									return !model.get('potion');
						}));
					}

					// We have no cards left to select from, bail out, this is
					// an error condition
					if( 0 >= selection.length ) throw "Too few cards to select from.";

					var model = selection.random();
					//console.log('[ adding: '+model.get('name')+','+model.get('potion')+' ]');
					this.add(model);
					selection.remove(model);

					if( model.get('potion') ) potCards += 1;
					if( model.get('type').attack && 
						window.options.get('require_defense') && 
						!defenseAdded ) {
						defenseRequired = true;
					}
					if( model.get('type').defense ) {
						defenseAdded = true;
					}
				}
			}
		}
		catch( error ) {
			this.error += error;
		}

    if( defenseRequired && !defenseAdded ) {
      var reactions = new Library_Collection(window.library.filter(function(model) {
        return model.isSelectable() && model.get('type').defense;
      }));
      if( 0 < reactions.length ) {
        var model = reactions.random();
        var lastModel = this.last();
        this.remove(this.last());
        this.add(model);
      }
    }

    // Handle any per-card special rules, such as young witch & black market
    // We handle this afterwards.
    this.each(function(model) {
      if( 'Young Witch' === model.get('name') ) self.bane = true;
      else if( 'Black Market' === model.get('name') ) self.black_market = true;
    });

    if( true === this.bane ) {
      this.selectBaneCard();
    }
    if( true === this.black_market ) {
      this.buildBlackMarket();
    }
  },
  selectBaneCard: function() {
    var self = this;
    this.bane = new Library_Collection(window.library.filter(function(m) {
      return m.isSelectable() && !self.get(m.get('name')) &&
        ( 2 <= m.get('cost') && 3 >= m.get('cost') ) && !m.get('potion');
    })).random();

    if( 'Black Market' === this.bane.get('name') ) {
      this.black_market = true;
    }

    if( false === this.bane ) this.error += "No valid Bane cards available.";
  },
  buildBlackMarket: function() {
    var self = this,
        blackMarket = null,
        size = window.options.get('blackmarket_size');
    var cards = new Library_Collection(window.library.filter(function(m) {
      return m.isSelectable() && !self.get(m.get('name')) &&
        (!self.bane || self.bane.get('name') !== m.get('name'));
    }));

    
    if( cards.length < size ) {
    	this.error += "Insufficient cards remaining for Black Market";
    	return;
    }
    else if( cards.length === size ) {
      blackMarket = cards;
    }
    else {
      blackMarket = new Card_Collection();
      while( blackMarket.length < size ) {
        var model = cards.random();
        blackMarket.add(model);
        cards.remove(model);
      }
    }
    this.black_market = blackMarket;
  }
});
