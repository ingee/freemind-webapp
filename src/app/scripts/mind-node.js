'use strict';

var app = app || {};
var Backbone = Backbone || {};

app.MindNode = Backbone.Model.extend({
  defaults: {
    TEXT: ''
  },

  initialize: function(obj, option) {
    obj = obj || {};
    option = option || {};
    option.parse = false; // we already completed xml-parsing.
                          // and don't need additional xml-parsing from now.

    this.childNodes = new app.MindNodeCollection();
    var node = this.attributes.node;
    if (node) {
      if (node instanceof Array) {
        var i, length = node.length;
        for (i = 0; i < length; i++) {
          this.addNode(new app.MindNode(node[i], option));
        }
      } 
      else {
        this.addNode(new app.MindNode(node, option));
      }
    }
  },

  addNode: function(node) {
    this.childNodes.add(node);
  },

  parse: function(response) {
    console.log('model({TEXT:"'+ this.get('TEXT')+ '"}).parse(response)');
    console.log('..model.parse(): response='+ response);
    var result = this.parseXml(response);
    console.log('..model.parse(): result='+ JSON.stringify(result));
    return result.map.node;
  },

  parseXml: function(xml, arrayTags) {
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
  }
});

