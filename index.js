'use strict';

var extend = require('extend');

var repl = require('repl')
  , vm = require('vm')
  , fs = require('fs');


/**
 * Start the REPL and expose variables in `context`.
 *
 * @arg {Object} context
 * @return {Repl}
 */
var replWith = function (context) {
  var r = repl.start({
    prompt: '> ',
    useGlobal: true
  });

  extend(r.context, context);
  return r;
};


/**
 * Start the REPL and expose top-level definitions in `filename`.
 *
 * @arg {string} filename
 * @arg {function(Error, Repl)} [cb]
 */
module.exports = function (filename, cb) {
  cb = cb || function () {};

  fs.readFile(filename, { encoding: 'utf8' }, function (err, script) {
    if (err) return cb(err);

    var sandbox = {};
    vm.runInNewContext(script, sandbox, filename);

    var repl = replWith(sandbox);
    return cb(null, repl);
  });
};
