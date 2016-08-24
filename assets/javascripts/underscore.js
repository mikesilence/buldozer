'use strict';

var _ = require('underscore');
var storage = require('./storage');
var template;
var application;

template = (function() {
  return '<div class="col-sm-4 col-lg-4 col-md-4">' +
  '<div class="thumbnail">' + 
  '<img src="' +
  '<% if (image) { %> <%= image %>' +
  '<% } else { %> http://placehold.it/320x150 <% } %>' +
  '" alt="">' +
  '<div class="caption">' +
  '<h4 class="pull-right">$ <%= cost %></h4>' +
  '<h4><a href="<%= url %>"><%= title %></a></h4>' +
  '<p><%= discription %></p></div>' +
  '<div class="ratings">' +
  '<p class="pull-right"><%= reviews %> reviews</p>' +
  '<p>' +
  '<% for (var i = 0; i < 5; i++) { %>' +
    '<span class="glyphicon glyphicon-star' +
    '<% if (rating <= i ) { %>-empty' +
    '<% } %>' +
    '"></span>' +
  '<% } %>' +
  '</p></div></div></div>';
});

application = function() {
  var list = document.querySelector('.js-list');
  var items = [];

  if (list) {
    _.each(storage, function(item) {
      var tmp = _.template(template())(item);
      items.push(tmp);
    });

    list.innerHTML = items.join('');
  }
}

application();