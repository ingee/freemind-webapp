'use strict';

var Backbone = Backbone || {};
var app = app || {};
var $ = $ || {};

app.Router = Backbone.Router.extend({
  routes: { 
    'main/:url': 'generateNodeTree'
  },

  generateNodeTree: function(url) {
    console.log('router.generateNodeTree(url), url='+ url);
    app.root = new app.MindNode(app.sampleXml, {parse:true});
    app.rootvw = new app.MindNodeView({ model: app.root });
    app.$mindmapList.html('');
    app.$mindmapList.append(app.rootvw.render().el);
  }
});

