'use strict';

var Backbone = Backbone || {};
var app = app || {};

app.MindNode = Backbone.Model.extend({
  defaults: {
    text: ''
  },

  initialize: function(obj, option) {
    obj = obj || {};
    option = option || {};

    console.log('model({text:'+ this.get('text')+ '}).initialize(obj), obj='+ JSON.stringify(obj));
    this.childNodes = new app.MindNodeCollection();
    if (obj.childNodes) {
      var child,
          i, length = obj.childNodes.length;
      for (i = 0; i < length; i++) {
        child = obj.childNodes[i];
        this.addNode(new app.MindNode(child, option));
      }
    }
  },

  addNode: function(node) {
    console.log('model({text:'+ this.get('text')+ '}).addNode(node), node='+ JSON.stringify(node));
    this.childNodes.add(node);
  },

  parse: function(response) {
    console.log('model({text:'+ this.get('text')+ '}).parse(response), response='+ response);
    var result = this.parseXml(response);
    console.log('..model({text:'+ this.get('text')+ '}).parse(response), result='+ JSON.stringify(result));
    return result;
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

