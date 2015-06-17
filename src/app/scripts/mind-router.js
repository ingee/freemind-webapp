'use strict';

var Backbone = Backbone || {};
var app = app || {};
var $ = $ || {};

app.Router = Backbone.Router.extend({
  routes: { 
    'main/:url': 'generateNodeTree'
  },

  initialize: function() {
    console.log('router.initialize()');
  },

  generateNodeTree: function(url) {
    console.log('router.gnerateNodeTree(url), url=' + url);

    console.log('..router.generateNodeTree(): preparing model tree');
    app.root = new app.MindNode(app.sampleXml, {parse:true});

    console.log('..router.generateNodeTree(): preparing view tree');
    app.rootvw = new app.MindNodeView({ model: app.root });
    $('#mindmap-list').html('');
    $('#mindmap-list').append(app.rootvw.render().el);

    console.log('..router.generateNodeTree(): completed!');
  }
});

