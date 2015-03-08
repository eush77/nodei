'use strict';

var lowercase = ' '.charCodeAt();

module.exports = function (chars) {
  return chars.map(function (char) {
    return char | lowercase;
  });
};
