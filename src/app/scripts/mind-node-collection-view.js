'use strict';

var Backbone = Backbone || {};
var app = app || {};

app.MindNodeCollectionView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list',

  render: function() {
    var thisEl = this.$el;
    this.collection.each( function(model) {
      var vw = new app.MindNodeView({ model: model });
      thisEl.append( vw.render().el );
    } );
    return this;
  }
});

