'use strict';

var _ = require('underscore');
var storage;
var template;
var application;

storage = [{
  image: '',
  url: '',
  title: 'First Product',
  discription: 'See more snippets like this online store item at Bootsnipp - http://bootsnipp.com.',
  cost: 24.99,
  rating: 5,
  reviews: 15
}, {
  image: '',
  url: '',
  title: 'Second Product',
  discription: 'This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  cost: 64.99,
  rating: 4,
  reviews: 12
}, {
  image: '',
  url: '',
  title: 'Third Product',
  discription: 'This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  cost: 74.99,
  rating: 4,
  reviews: 31
}, {
  image: '',
  url: '',
  title: 'Fourth Product',
  discription: 'This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  cost: 84.99,
  rating: 3,
  reviews: 6
}, {
  image: '',
  url: '',
  title: 'Fifth Product',
  discription: 'This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  cost: 94.99,
  rating: 4,
  reviews: 18
}]

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