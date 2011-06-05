window.Library_Collection = Backbone.Collection.extend({
  model: Card_Model,
  compare_Name: function(card) {
    return card.get('name');
  },
  compare_Set: function(card) {
    return card.get('set')+'_'
      +card.get('name');
  },
  compare_Cost: function(card) {
    return card.get('cost')+'_'
      +(card.get('potion')?'1':'0')+'_' 
      +card.get('name');
  },
  sortBySet: function() {
    this.comparator = this.compare_Set;
    this.sort();
  },
  sortByCost: function() {
    this.comparator = this.comprare_Cost;
    this.sort();
  },
  sortByName: function() {
    this.comparator = this.compare_Name;
    this.sort();
  }
});