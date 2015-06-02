'use strict';

var Backbone = Backbone || {};
var App = App || {};

App.MindNodeView = Backbone.View.extend({
  id: 'mindmap',

  render: function() {
    this.$el.html(this.model.get('text'));
    return this.$el;
  }
});

