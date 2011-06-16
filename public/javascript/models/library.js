window.Library_Collection = Backbone.Collection.extend({
  default_size: 10,
  model: Card_Model,
  bane: null,
  black_market: null,
  prosperity_basics: false,
  load: function(set) {
    console.log('[ loading deck: '+set+']');
  },
  generate: function() {
    var defenseRequired = false,
        defenseAdded = false;
    // If we're using Alchemy, select the min number of potion cards.
    if( window.options.get('sets').alchemy ) {
      var pots = new Library_Collection(window.app.library.filter(function(model) {
        return model.get('set') == 'Alchemy';
      }));

      while( this.length < window.options.get('alchemy_min') ) {
        var i = Math.floor(Math.random()*pots.length);
        var model = pots.at(i);
        this.add(model);
        pots.remove(model);
        if( model.get('type').attack && window.options.get('require_defense') ) {
          defenseRequired = true;
        }
      }
    }

    if( this.length < this.default_size ) {
      // Handle adding reaction cards if necessary
      var selection = new Library_Collection(window.app.library.filter(function(model) {
        // does not yet handle alchemy max cards
        return (
          window.options.get('sets')[model.get('set')] ||
          window.options.get('promos')[model.get('name')]
        );
      }));

      while( this.length < this.default_size ) {
        if( defenseRequired && !defenseAdded ) {
          // Handle adding a required defense card.
        }
        var i = Math.floor(Math.random()*selection.length);
        var model = selection.at(i);
        this.add(model);
        selection.remove(model);
        if( model.get('type').attack && window.options.get('require_defense') && !defenseAdded ) {
          defenseRequired = true;
        }

        // Flag Little Witch & Black Market
      }
    }

    window.app.lastDeck = this;
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
