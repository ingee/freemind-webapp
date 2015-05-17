'use strict';

var Backbone = Backbone || {};
var App = App || {};

App.router = new (Backbone.Router.extend({
  initialize: function() {
    console.log('router.initialize');
  }
}))();

