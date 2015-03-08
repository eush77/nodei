'use strict';

var browserify = require('browserify'),
    detective = require('detective');

var fs = require('fs'),
    Path = require('path');


module.exports = function (path, cb) {
  fs.readFile(path, { encoding: 'utf8' }, function (err, source) {
    if (err) return cb(err);

    var bundle = browserify({
      basedir: Path.dirname(path)
    });
    bundle.require(detective(source));
    bundle.bundle(function (err, require) {
      // TODO: Preserve strict mode.
      return cb(err, require + source);
    });
  });
};
