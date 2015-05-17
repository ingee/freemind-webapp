'use strict';

var Backbone = Backbone || {};
var App = App || {};

App.MindNodeCollection = Backbone.Collection.extend({
  model: App.MindNode
});

