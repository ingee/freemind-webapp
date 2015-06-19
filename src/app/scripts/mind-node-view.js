'use strict';

var Backbone = Backbone || {};
var _ = _ || {};
var app = app || {};

app.MindNodeView = Backbone.View.extend({
  tagName: 'li',

  template: _.template(
    '<% if (typeof(node) !== "undefined" && node.length) { %>'+
      '<span class="icon down">'+
    '<% } else { %>'+
      '<span class="icon minimize">'+
    '<% } %><%= TEXT %></span>'
  ),
  
  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    if (this.model.childNodes.length) {
      var childVw = new app.MindNodeCollectionView({ 
        collection: this.model.childNodes 
      });
      this.$el.select('ul.list').append( childVw.render().el );
    }
    return this;
  }
});

