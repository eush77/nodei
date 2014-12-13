'use strict';

var zipmap = require('zipmap')
  , diff = require('object-diff')
  , pairs = require('object-pairs');

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

  // Some context properties have getters, so
  // it is not possible to just reassign them.
  pairs(diff(r.context, context)).forEach(function (prop) {
    var key = prop[0], value = prop[1];
    delete r.context[key];
    r.context[key] = value;
  });

  return r;
};


/**
 * Construct a minimal sandbox for script execution.
 *
 * It includes:
 *   - console,
 *   - Buffer,
 *   - setTimeout,
 *   - clearTimeout,
 *   - setInterval,
 *   - clearInterval.
 */
var makeSandbox = function () {
  var attrs = ['console', 'Buffer', 'setTimeout',
               'clearTimeout', 'setInterval', 'clearInterval'];

  return zipmap(attrs.map(function (attr) {
    return {
      key: attr,
      value: global[attr]
    };
  }));
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

    var sandbox = makeSandbox();
    vm.runInNewContext(script, sandbox, filename);

    var repl = replWith(sandbox);
    return cb(null, repl);
  });
};
