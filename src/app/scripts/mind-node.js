'use strict';

var Backbone = Backbone || {};
var App = App || {};

App.MindNode = Backbone.Model.extend({
  defaults: {
    text: ''
  },

  initialize: function() {
    this.childNodes = new App.MindNodeCollection();
  },

  addNode: function(node) {
    this.childNodes.add(node);
  },

  hello: function() {
    console.log('hello? ' + this.get('text'));
    this.childNodes.hello();
  }
});

