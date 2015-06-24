'use strict';

var $ = $ || {};
var Backbone = Backbone || {};

var app = {
  sampleXml: 
    '<map version="0.9.0">'+
    '<!-- To view this file, download free mind mapping software FreeMind '+
        'from http://freemind.sourceforge.net -->'+
    '<node CREATED="3" ID="1" MODIFIED="2" TEXT="Feel free with FreeMind !"/>'+
    '</map>',

  start: function() {
    this.router = new this.Router();
    Backbone.history.start();
    window.location.href = '#main/hello';
  }
};

$(function() { 
  app.$mindmapList = $('#mindmap-list');
  app.start(); 

  var $fileElm = $('#mindmap-file');
  $fileElm.on('change', function() {
    var file = $fileElm[0].files[0];
    var fileReader = new FileReader();
    fileReader.onload = function() {
      app.sampleXml = fileReader.result;
      window.location.href = '#main/'+ file.name;
    };
    fileReader.onerror = function(event) {
      window.alert('FILE-ERROR: '+ event.target.error.code);
    };
    fileReader.readAsText(file);
  });
});

