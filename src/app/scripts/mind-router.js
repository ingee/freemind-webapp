'use strict';

var Backbone = Backbone || {};
var App = App || {};
var $ = $ || {};

App.Router = Backbone.Router.extend({
  routes: { 
    'main/:url': 'generateNodeTree'
  },

  initialize: function() {
    console.log('router.initialize()');
  },

  generateNodeTree: function(url) {
    console.log('router.gnerateNodeTree(url), url=' + url);

    console.log('..router.generateNodeTree(): preparing model tree');
    App.root = new App.MindNode(App.sampleObj);

    console.log('..router.generateNodeTree(): preparing view tree');
    App.rootvw = new App.MindNodeView({ model: App.root });
    $('#mindmap-list').html('');
    $('#mindmap-list').append(App.rootvw.render().el);

    console.log('..router.generateNodeTree(): completed!');
  }
});

