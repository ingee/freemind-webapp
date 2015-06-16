'use strict';

var Backbone = Backbone || {};
var App = App || {};

App.MindNode = Backbone.Model.extend({
  defaults: {
    text: ''
  },

  initialize: function(obj, option) {
    obj = obj || {};
    option = option || {};

    console.log('model.initialize(obj), obj=' + JSON.stringify(obj));
    this.childNodes = new App.MindNodeCollection();
    if (obj.childNodes) {
      var i = 0, 
          length = obj.childNodes.length,
          child = null;
      for (; i < length; i++) {
        child = obj.childNodes[i];
        this.addNode(new App.MindNode(child, option));
      }
    }
  },

  addNode: function(node) {
    console.log('model.addNode(node), node=' + JSON.stringify(node));
    this.childNodes.add(node);
  },

  hello: function() {
    console.log('hello? ' + this.get('text'));
    this.childNodes.hello();
  }
});

