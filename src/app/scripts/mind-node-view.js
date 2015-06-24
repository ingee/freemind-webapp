'use strict';

var _ = _ || {};
var app = app || {};
var Backbone = Backbone || {};

app.MindNodeView = Backbone.View.extend({
  tagName: 'li',

  template: _.template(
    '<% if (typeof(node) !== "undefined") { %>' + '<span class="icon down icon right">' +
    '<% } else { %>' + '<span class="icon minimize">' +
    '<% } %><%= TEXT %></span>'
  ),

  events: {
    'click': 'toggleFolding'
  },
  
  initialize: function() {
    this.hasChild = this.model.childNodes.length;
    this.$childEl = null;
    this.$folderEl = null;
    this.isFolded = true;
  },

  toggleFolding: function(event) {
    event.stopPropagation();
    if (!this.hasChild) {
      return;
    }

    this.isFolded = !this.isFolded;
    this.setFolding(this.isFolded);
  },

  setFolding: function(isFolded) {
    if (isFolded) {
      this.$folderEl.removeClass('icon down');
      this.$folderEl.addClass('icon right');
      this.$childEl.hide();
    }
    else {
      this.$folderEl.removeClass('icon right');
      this.$folderEl.addClass('icon down');
      this.$childEl.show();
    }
  },

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    this.$folderEl = this.$el.find('span');
    if (this.hasChild) {
      var childVw = new app.MindNodeCollectionView({ 
        collection: this.model.childNodes 
      });
      this.$el.append( childVw.render().el );
      this.$childEl = childVw.$el;
      this.setFolding(this.isFolded);
    }
    return this;
  }
});

