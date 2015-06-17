'use strict';

var Backbone = Backbone || {};
var app = app || {};

app.MindNodeCollection = Backbone.Collection.extend({
  model: app.MindNode,

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

