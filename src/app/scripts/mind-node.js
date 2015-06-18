'use strict';

var Backbone = Backbone || {};
var app = app || {};

app.MindNode = Backbone.Model.extend({
  defaults: {
    TEXT: ''
  },

  initialize: function(obj, option) {
    obj = obj || {};
    option = option || {};
    option.parse = false; //we don't need additional xml parsing

    console.log('model({TEXT:'+ this.get('TEXT')+ '}).initialize(obj, option)');
    console.log('..obj='+ JSON.stringify(obj));
    console.log('..option='+ JSON.stringify(option));
    this.childNodes = new app.MindNodeCollection();

    var children = this.attributes.node;
    if (children) {
      if (children instanceof Array) {
        var child, i, length = children.length;
        for (i = 0; i < length; i++) {
          child = children[i];
          this.addNode(new app.MindNode(child, option));
        }
      } 
      else {
        this.addNode(new app.MindNode(children, option));
      }
    }
  },

  addNode: function(node) {
    console.log('model({TEXT:'+ this.get('TEXT')+ '}).addNode(node)');
    console.log('..node='+ JSON.stringify(node));
    this.childNodes.add(node);
  },

  parse: function(response) {
    console.log('model({TEXT:'+ this.get('TEXT')+ '}).parse(response)');
    console.log('..response='+ response);
    var result = this.parseXml(response);
    app.result = result;
    console.log('..result='+ JSON.stringify(result.map.node));
    return result.map.node;
  },

  parseXml: function(xml, arrayTags) {
    //transform XML string to JSON string
    //
    var dom = null;
    if (window.DOMParser) {
      dom = (new DOMParser()).parseFromString(xml, 'text/xml');
    }
    else if (window.ActiveXObject) {
      dom = new window.ActiveXObject('Microsoft.XMLDOM');
      dom.async = false;
      if (!dom.loadXML(xml)) {
        throw dom.parseError.reason + ' ' + dom.parseError.srcText;
      }
    }
    else {
      throw 'cannot parse xml string!';
    }

    function isArray(o) {
      return Object.prototype.toString.apply(o) === '[object Array]';
    }

    function parseNode(xmlNode, result) {
      if (xmlNode.nodeName === '#text' && xmlNode.nodeValue.trim() === '') {
        return;
      }

      var jsonNode = {};
      var existing = result[xmlNode.nodeName];
      if (existing) {
        if (!isArray(existing)) {
          result[xmlNode.nodeName] = [existing, jsonNode];
        }
        else {
          result[xmlNode.nodeName].push(jsonNode);
        }
      }
      else {
        if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) !== -1) {
          result[xmlNode.nodeName] = [jsonNode];
        }
        else {
          result[xmlNode.nodeName] = jsonNode;
        }
      }

      var i, length;
      if (xmlNode.attributes) {
        var attribute;
        length = xmlNode.attributes.length;
        for (i = 0; i < length; i++) {
          attribute = xmlNode.attributes[i];
          jsonNode[attribute.nodeName] = attribute.nodeValue;
        }
      }

      length = xmlNode.childNodes.length; 
      for (i = 0; i < length; i++)
      {
        parseNode(xmlNode.childNodes[i], jsonNode);
      }
    }

    var result = {};
    if (dom.childNodes.length) {
      parseNode(dom.childNodes[0], result);
    }

    return result;
  },

  hello: function() {
    console.log('hello? ' + this.get('text'));
    this.childNodes.hello();
  }
});

