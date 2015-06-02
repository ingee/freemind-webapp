'use strict';

var Backbone = Backbone || {};
var App = App || {};
var $ = $ || {};

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

    var root = new App.MindNode({text: 'new-map'});
    var a = new App.MindNode({text: 'this is A'});
    var b = new App.MindNode({text: 'this is B'});
    var c = new App.MindNode({text: 'this is C'});
    var sub1 = new App.MindNode({text: 'Sub-Sub-1'});
    var sub2 = new App.MindNode({text: 'Sub-Sub-2'});
    var sub3 = new App.MindNode({text: 'Hello, World?'});
    root.addNode(a);
    root.addNode(b);
    root.addNode(c);
    b.addNode(sub1);
    b.addNode(sub2);
    b.addNode(sub3);
    console.log('MindNode tree ready!');
    root.hello();

    App.rootvw = new App.MindNodeView({ model: root });
    $('#mindmap').append(App.rootvw.render());
  }
});

