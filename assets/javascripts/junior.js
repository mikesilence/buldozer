'use strict';
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

template = function(data) {
  var tmp = []; // Создадим массив - хранилище

  // Далее будем добавлять каждый элемент карточик товара
  tmp.push('<div class="col-sm-4 col-lg-4 col-md-4">');
  tmp.push('<div class="thumbnail">');

  // Если нет картинки, то ставим заглушку
  tmp.push('<img src="');
  if (data.image) tmp.push(data.image);
  else tmp.push('http://placehold.it/320x150');
  tmp.push('" alt="">');

  tmp.push('<div class="caption">');
  tmp.push('<h4 class="pull-right">$ ');
  tmp.push(data.cost);
  tmp.push('</h4>');

  tmp.push('<h4>');
  tmp.push('<a href="');
  tmp.push(data.url);
  tmp.push('">');
  tmp.push(data.title);
  tmp.push('</a></h4><p>');
  tmp.push(data.discription);
  tmp.push('</p></div>');
  tmp.push('<div class="ratings">');
  tmp.push('<p class="pull-right">');
  tmp.push(data.reviews);
  tmp.push(' reviews</p>');

  // Простая логика отрисовки звезлочек в рейтинге
  tmp.push('<p>');
  for (var i = 0; i < 5; i++) {
    tmp.push('<span class="glyphicon glyphicon-star');
    if (data.rating <= i ) tmp.push('-empty');
    tmp.push('"></span>');
  }
  tmp.push('</p>');

  tmp.push('</div></div></div>');

  // И в конце мы просто объединяем это все в 1 элемент
  return tmp.join('');
};

application = function() {
  var list = document.querySelector('.js-list');
  var items = [];

  if (list) {
    for (var i = 0; i < storage.length; i++) {
      items.push(template(storage[i]));
    }

    list.innerHTML = items.join('');
  }
}

application();