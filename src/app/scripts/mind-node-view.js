'use strict';

var Backbone = Backbone || {};
var app = app || {};

app.MindNodeView = Backbone.View.extend({
  tagName: 'li',

  render: function() {
    var htmlStr = '';
    if (this.model.childNodes.length) {
      htmlStr += '<span class="icon down">';
    }
    else {
      htmlStr += '<span class="icon minimize">';
    }
    htmlStr += this.model.get('text');
    htmlStr += '</span>';
    this.$el.html(htmlStr);

    if (this.model.childNodes.length) {
      var childVw = new app.MindNodeCollectionView({ 
        collection: this.model.childNodes 
      });
      this.$el.select('ul.list').append( childVw.render().el );
    }
    return this;
  }
});

