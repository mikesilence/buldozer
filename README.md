## Шаблонизаторы
https://github.com/mikesilence/buldozer.git

Представим, что нам поступил заказ на мега крутой интернет магазин по продаже квадрокоптеров. А заказчик, дупустим сам Иван Гуглов, очень суровый мужик и просит сделать максимально быстро и качественно.

![О боже](http://book.yd73.ru/wp-content/uploads/2014/04/note.png)

Мы взялись за этот проект и нам дано:
*Весь список товаров в таблице excel.
*Мы ни как не свзязаны с back-end'ом. Весь back будет подстраиваться под нашу реализацию и документацию.
*Есть карточки товара, которые нужно как то заполнять на нашей стороне.

Звучит не очень успокаивающе но на самом деле у нас есть можество вариантов реализации. Давайте рассмотрим самый простой вариант - примитивный.

## Вариант Примитивный. (Ветка master)
Сидя на энергетиках всю ночь, мы верстали шаблоны и столкнувщись с карточкой товара. Мы брали эталон и копировали его под каждый элемент товара.

```html
<div class="col-sm-4 col-lg-4 col-md-4">
    <div class="thumbnail">
        <img src="http://placehold.it/320x150" alt="">
        <div class="caption">
            <h4 class="pull-right">$24.99</h4>
            <h4><a href="#">First Product</a>
            </h4>
            <p>See more snippets likitem at <a target="_www.bootsnipp.com"bootsnipp.com</a>.</p>
        </div>
        <div class="ratings">
            <p class="pull-right">15 reviews</p>
            <p>
                <span class="glyphicospan">
                <span class="glyphicospan">
                <span class="glyphicospan">
                <span class="glyphicospan">
                <span class="glyphicospan">
            </p>
        </div>
    </div>
</div>
```

Нам придется на 10 товаров, 10 раз копировать этот блок и заполнять его информацией. 
Вариант очень простой. Ни требует совершенно ни каких знаниях JavaScript. Он подходит если мы студент 1го курса и нам очень нужны деньги на электронные сигареты.

На самом деле, я хоть и назвал этот вариант простым, но он не очень прост, потому что нам приходится делать очень много манипуляций: править каждый раз скопированный элемент, сверять его с таблицей товаров, потом еще перепроверять по 100 раз. Есть вариант, который способен упростить нам жизнь при минимальных трудозатратах. Для начала давайте возьмем наш excel и приобразуем его в массив данных. Ну например прогнав его через он-лайн [конвертор](https://shancarter.github.io/mr-data-converter/), переведем его в [json](https://learn.javascript.ru/json) формат. И пусть это будет наше хранилеще, наш **storage**.

Переведя все в один массив это развязывает нам руки для использования JavaScript'а. И можем перейти к следующему варианту реализации - Junior.

## Вариант Junior. (Ветка stage01)
И так. Теперь и всегда нам доступен один большой массив данных **storage**.
Так же у нас есть уже сверстаная карточка товара. Что мы можем с этим сделать?
Мы можем взять наш html этого блока и полностью создать его при помощи JavaSctipt. Подготовив тем самым для себя **шаблон** карточки для всех товаров.
Сразу скажу, что мы не будет создавать каждый элемент т.к. это займет очень много строчек ненужного кода, много одноразовых переменных и это все будет очень не гибко.

```javascript
Template = function() {
  var div = document.createElement('div');
  ...
};
```

Мы пойдем более хитрым путем: через массив, метод Array.push() - для добавления блоков и метод Array.join() - для сбора нашего шаблона.

```javascript
Template = function() {
  var tmp = []; // Создадим массив - хранилище

  // Далее будем добавлять каждый элемент карточик товара
  tmp.push('<div class="col-sm-4 col-lg-4 col-md-4">');
  tmp.push('<div class="thumbnail">');
  tmp.push('<img src="http://placehold.it/320x150" alt="">');
  tmp.push('<div class="caption">');
  tmp.push('<h4 class="pull-right">$64.99</h4>');
  tmp.push('<h4><a href="#">Second Product</a>');
  tmp.push('</h4>');
  tmp.push('<p>This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>');
  tmp.push('</div>');
  tmp.push('<div class="ratings">');
  tmp.push('<p class="pull-right">12 reviews</p>');
  tmp.push('<p>');
  tmp.push('<span class="glyphicon glyphicon-star"></span>');
  tmp.push('<span class="glyphicon glyphicon-star"></span>');
  tmp.push('<span class="glyphicon glyphicon-star"></span>');
  tmp.push('<span class="glyphicon glyphicon-star"></span>');
  tmp.push('<span class="glyphicon glyphicon-star-empty"></span>');
  tmp.push('</p>');
  tmp.push('</div>');
  tmp.push('</div>');
  tmp.push('</div>');

  // И в конце мы просто объединяем это все в 1 элемент
  return tmp.join('');
};
```

На выходе мы получим тот же самый html код, который теперь мы можем вставить куда угодно и столько раз, сколько нам нужно. Нам осталось только скрестить наши данные и наш шаблон. Естественно нам придеться немного его модернизировать.

```javascript
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
}, ...];

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
      list.innerHTML = items.join('');
    }
  }
}

application();
```

ТАДАМ! Получили все тоже самое при меньших затрат времени. Теперь нам совершенно не выжно сколько будет у нас карточек товаров. И при таком раскладе back-end сам может дописать функцию, которая будет делать запрос к базе и записать данные в **storage** и запустив наш скрипт отрисовать карточки товаров.

Как видете тут нету ни каких фрейморков, шаблонизаторов и мы обошлись даже без jQuery. А сам исполняемый код уместился в 10 строчек. Можем сами писать свои шаблоны и делать с ними что захотим.

Да, мы на столько круты. Но нет =)

Все тоже самое уже умеют делать, но лучше и быстрее уже готовые фреймворки.
Но тут начинаеться самое сложное для нас. Их много а мы одни, что делать?

Давайте пока остановимся на примере карточки товара.
Мы могли бы использовать для реализации микро-шаблонизатор ([underscore](http://underscorejs.org/), [mustache](https://mustache.github.io/), [LoDash](https://lodash.com/docs#template) и т.д.).

## Вариант "микро-шаблонизатор". (Ветка stage02)
Не буду описывать инструкции как устанавливать и настраивать фрейморки. Хочу показать вам на что они способны, на примере underscore template. Скажу сразу, в дополнение к микро-шаблонизатору мы получаем кучу мощных инструментов. Напимер метод _.each, который заменит нам цикл for.

```javascript
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
```

Давайте взглянем на функцию _template()_. Мы ее полностью переписали используя синтаксис шаблонизатора underscore. Избавились от массивов, дополнительных переменных. Код стал более читабелен и теперь мы добавляем значение лишь указав в нужном месте через <%= name %>, где name передаваемое значение. Мы так же можем использовать инструкции if и for.
В функции _application()_ мы заменили for на each и теперь для каждого товара мы просто вызываем _  _.template()_ передавая в качестве аргументов наш описаный шаблон и данные. В руководстве к underscore вы таких примеров не найдете, но кому нужно что бы я просто скопипастил вам примеры? Они есть на сайте и очень хорошо описаны, но они далеки от реалынх условий. Оставим это новечкам, а нам некогда.
Мы стали еще круче!

![OMG](http://risovach.ru/upload/2013/01/mem/a-chto-esli_9165883_orig_.jpg)

А что если взять и вообще все наши шаблоны прогнать через такой шаблонизатор?
Конечно можно, но представте как это будет выглядеть: куча срок кода для каждого элемента, куча скрипта который должен за всем этим следить и собирать. Но как же быть если очень хочется? На помощь нам приходят совершенно нового уровня шаблонизаторы: [Pug (aka Jade)](http://jade-lang.com/), [React](https://facebook.github.io/react/) и т.д.

Это очень мощные шаблонизаторы, и они отличаються друг от друга.

**Вариант Jade. (Ветка stage03)**
Принцип работы очень прост. Мы описываем весь наш шаблон в файле с расширением *.jade и так как это JavaScript шаблонизатор мы прям в шаблоне можем использовать всю силу JavaScript не подключая ни каких дополнительных скриптов с логикой отображения. Потом ~~нажимаем одну кнопку~~ (прописываем команду или отдаем все в webpack) и получаем уже полностью сформированный html фаил!
Более того, мы можем разбить весь шаблон на маленькие кусочки и подключать их в наш главный фаил.

```stylesheets
.row
    include ./items.pug
```

А вот и наши с вами карточки товаров

```javascript
each item in storage
  .col-sm-4.col-lg-4.col-md-4
    .thumbnail
      if item.image.length > 3
        img(src=''+item.image, alt='', style="width:auto;height:122px;")
      else
        img(src='http://placehold.it/320x150', alt='')
      .caption
        h4.pull-right 
          | $ 
          = item.cost
        h4
          if item.url.length > 3
            a(href='#')
              = item.title
          else
            = item.title
        p
          = item.discription
      .ratings
        p.pull-right
          = item.reviews
          |  reviews
        p
          - for (var i = 0; i < 5; i++)
            if item.rating <= i
              span.glyphicon.glyphicon-star-empty
            else
              span.glyphicon.glyphicon-star
```

Jade очень гибок в отличие от underscore. При помощи Jade мы можем не держать все данные у себя а отадавать наши шаблоны *.jade на сервер где например python подставит данные из басы и сформирует нам html, который сам же все и отрисует на стороне клиента.