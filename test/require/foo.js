'use strict';

var chars = require('./chars.json'),
    lowercase = require('./lower-case'),
    string = require('./string');

// This token triggers an error if the whole bundle replaces some
// part of the template via simple String.prototype.replace call
// with a string replacer.
'$';

module.exports = string(lowercase(chars));
