window.Card_Model = Backbone.Model.extend({
  initialize: function(data) {
    this.id = this.get('name');
  }
});
