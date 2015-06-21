'use strict';

var Backbone = Backbone || {};
var app = app || {};

app.MindNodeCollection = Backbone.Collection.extend({
  model: app.MindNode,
});

