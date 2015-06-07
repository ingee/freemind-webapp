'use strict';

var Backbone = Backbone || {};
var App = App || {};

App.MindNodeCollection = Backbone.Collection.extend({
  model: App.MindNode,

  hello: function() {
    if (this.length <= 0) {
      return;
    }
    console.log('---collection bgn---');
    this.each(function(model) {
      model.hello();
    });
    console.log('---collection end---');
  }
});

