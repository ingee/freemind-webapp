'use strict';

var _ = _ || {};
var app = app || {};
var Backbone = Backbone || {};

app.MindNodeView = Backbone.View.extend({
  tagName: 'li',

  template: _.template(
    '<% if (typeof(node) !== "undefined") { %>' + '<span class="icon down">' +
    '<% } else { %>' + '<span class="icon minimize">' +
    '<% } %><%= TEXT %></span>'
  ),

  events: {
    'click': 'toggleFolding'
  },
  
  toggleFolding: function(event) {
    console.log('vw(TEXT='+ this.model.get('TEXT')+ '), '+ event.type+ ' event!');
    event.stopPropagation();
  },

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

