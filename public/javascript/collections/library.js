window.Library_Collection = Card_Collection.extend({
  initialize: function(models) {
    _(this).bindAll();
    Card_Collection.prototype.initialize.call(this, models);
  },
  random: function() {
    if( !this.length ) return null;
    return this.at(Math.floor(Math.random() * this.length));
  }
});
