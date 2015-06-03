'use strict';

var Backbone = Backbone || {};
var App = App || {};

App.MindNodeView = Backbone.View.extend({
  render: function() {
    var htmlStr = '<li><div><span>' + 
      this.model.get('text') + 
      '</span><ul class="list"></ul></div></li>';
    this.$el.html(htmlStr);
    var childVw = 
      new App.MindNodeCollectionView({ collection: this.model.childNodes });
    this.$el.select('ul.list').append( childVw.render().el );
    return this;
  }
});

