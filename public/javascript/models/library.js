window.Library_Collection = Backbone.Collection.extend({
  default_size: 10,
  model: Card_Model,
  bane: null,
  black_market: null,
  prosperity_basics: false,
  initialize: function(models) {
    _(this).bindAll(
      'load',
      'generate',
      'selectBaneCard',
      'buildBlackMarket',
      'getRandom'
    );
  },
  load: function(set) {
    console.log('[ loading deck: '+set+']');
  },
  generate: function() {
    var self = this,
        defenseRequired = false,
        defenseAdded = false;
    console.log('[ begin deck generation ]');

    // If we're using Alchemy, select the min number of potion cards.
    if( window.options.get('sets').Alchemy ) {
      var pots = new Library_Collection(window.app.library.filter(function(model) {
        return model.get('potion');
      }));

      while( this.length < window.options.get('alchemy_min') ) {
        var model = pots.getRandom();
        console.log('[ adding: '+model.get('name')+','+model.get('potion')+' ]');
        this.add(model);
        pots.remove(model);
        if( model.get('type').attack && window.options.get('require_defense') ) {
          defenseRequired = true;
        }
      }
    }
    console.log('[ finished adding potion cards ]');

    var potCards = this.length;

    // Then add the remaining number of cards, if any
    if( this.length < this.default_size ) {
      var selection = new Library_Collection(
        window.app.library.filter(function(model) { 
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

        var model = selection.getRandom();
        console.log('[ adding: '+model.get('name')+','+model.get('potion')+' ]');
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

    if( defenseRequired && !defenseAdded ) {
      var reactions = new Library_Collection(window.app.library.filter(function(model) {
        return model.isSelectable() && model.get('type').defense;
      }));
      if( 0 < reactions.length ) {
        var model = reactions.getRandom();
        var lastModel = this.last();
        this.remove(this.last());
        this.add(model);
      }
    }

    // Handle any per-card special rules, such as young witch & black market
    this.each(function(model) {
      if( 'Young Witch' === model.get('name') ) self.selectBaneCard();
      else if( 'Black Market' === model.get('name') ) self.buildBlackMarket();
    });
    window.app.lastDeck = this;
  },
  selectBaneCard: function() {
    var self = this;
    this.bane = new Library_Collection(window.app.library.filter(function(m) {
      return m.isSelectable() && !self.get(m.get('name')) &&
        ( 2 <= m.get('cost') && 3 >= m.get('cost') ) && !m.get('potion');
    })).getRandom();

    if( false === this.bane ) throw "No valid Bane cards available.";
  },
  buildBlackMarket: function() {
  },
  getRandom: function() {
    return 0 >= this.length ? 
      false : this.at(Math.floor(Math.random() * this.length));
  },
  compare_Name: function(card) {
    return card.get('name');
  },
  compare_Set: function(card) {
    return card.get('set')+'_'+
      card.get('name');
  },
  compare_Cost: function(card) {
    return card.get('cost')+'_'+
      (card.get('potion')?'1':'0')+'_'+
			card.get('name');
  },
  orderBy: function(sort) {
    if( 'name' === sort ) {
      this.comparator = this.compare_Name;
    }
    else if( 'set' === sort ) {
      this.comparator = this.compare_Set;
    }
    else if( 'cost' === sort ) {
      this.comparator = this.compare_Cost;
    }
    this.sort();
  }
});
