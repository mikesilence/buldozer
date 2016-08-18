'use strict';

var header = require('./header.pug');
var body = document.querySelector('body');

var options = [];

body.innerHTML = header(options);

console.log(header(options));