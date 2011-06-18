window.Card_Model = Backbone.Model.extend({
initialize: function(data) {
  this.id = this.get('name');
},
toJSON: function() {
  var json = Backbone.Model.prototype.toJSON.call(this);
  json.setAbbrev = this.get('set').substring(0,1);
  json.costStr = this.get('cost') + (this.get('potion')?'P':'&nbsp');
  return json;
},
isSelectable: function() {
  return (
    window.options.get('sets')[this.get('set')] ||
    window.options.get('promos')[this.get('name')]
  );
}
});
