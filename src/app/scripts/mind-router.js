'use strict';

var Backbone = Backbone || {};
var App = App || {};

App.Router = Backbone.Router.extend({
  routes: { 
    'mindmap/:url': 'generateNodeTree'
  },

  initialize: function() {
    console.log('router.initialize()');
  },

  generateNodeTree: function(url) {
    console.log('router.gnerateNodeTree( url=' + url + ' )');
    console.log('sample-data: '+ App.sampleMindMapData);
  }
});

