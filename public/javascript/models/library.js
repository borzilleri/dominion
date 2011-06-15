window.Library_Collection = Backbone.Collection.extend({
  model: Card_Model,
  load: function(set) {
    console.log('[ loading deck: '+set+']');
  },
  generate: function() {
    while( this.length < 10 ) {
      var i = Math.floor(Math.random()*window.app.library.length);
      var model = window.app.library.at(i).clone();

      if( !this.get(model.id) ) {
        this.add(model);
      }
    }
    this.orderBy('name');
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
      this.comparator = this.comprare_Cost;
    }
    this.sort();
  }
});
