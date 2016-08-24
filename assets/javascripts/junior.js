'use strict';
var storage = require('./storage');
var template;
var application;

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