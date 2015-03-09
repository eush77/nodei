'use strict';

var fs = require('fs');

var echo = fs.readFileSync(__dirname + '/echo.txt', { encoding: 'utf8' }).trim();
