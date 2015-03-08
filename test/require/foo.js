'use strict';

var chars = require('./chars.json'),
    lowercase = require('./lower-case'),
    string = require('./string');

module.exports = string(lowercase(chars));
