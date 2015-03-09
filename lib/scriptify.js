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

    var dependencies = detective(source);
    if (!dependencies.length) {
      return cb(null, source);
    }

    bundle.require(dependencies);
    bundle.bundle(function (err, requirable) {
      var loader = function require() {
        var REQUIRE_ASSIGNMENT;
        return require.apply(this, arguments);
      };
      var script = source + ';' + loader.toString().replace(/REQUIRE_ASSIGNMENT/, function () {
        // Raw replacement string: special patterns such as "$'" are not interpreted.
        return requirable;
      });

      return cb(err, script);
    });
  });
};
