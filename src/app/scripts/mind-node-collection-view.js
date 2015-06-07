'use strict';

var Backbone = Backbone || {};
var App = App || {};

App.MindNodeCollectionView = Backbone.View.extend({
  tagName: 'ul',
  className: 'list',

  render: function() {
    var thisEl = this.$el;
    this.collection.each( function(model) {
      var vw = new App.MindNodeView({ model: model });
      thisEl.append( vw.render().el );
    } );
    return this;
  }
});

