window.Card_Model = Backbone.Model.extend({
  initialize: function(data) {
    this.id = this.get('name');
  },
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);
    json.setAbbrev = this.get('set').substring(1);
    json.costStr = this.cost + (this.potion?'P':'&nbsp');
  }
});
