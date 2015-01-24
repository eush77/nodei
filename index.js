'use strict';

var zipmap = require('zipmap')
  , diff = require('object-diff')
  , pairs = require('object-pairs');

var repl = require('repl')
  , vm = require('vm')
  , fs = require('fs');


/**
 * Update REPL with variables in the `context`.
 *
 * @arg {Repl} repl
 * @arg {Object} context
 */
var updateRepl = function (repl, context) {
  // Some context properties have getters, so
  // it is not possible to just reassign them.
  pairs(diff(repl.context, context)).forEach(function (prop) {
    var key = prop[0], value = prop[1];
    delete repl.context[key];
    repl.context[key] = value;
  });
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
 *
 * @return {Object}
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
 * Load file and update REPL.
 *
 * @arg {Repl} repl
 * @arg {string} filename
 * @arg {function(err)} cb
 */
var loadFile = function (repl, filename, cb) {
  fs.readFile(filename, { encoding: 'utf8' }, function (err, script) {
    if (err) return cb(err);

    var sandbox = makeSandbox();
    vm.runInNewContext(script, sandbox, filename);

    updateRepl(repl, sandbox);
    return cb(null);
  });
};


/**
 * Start the REPL and expose top-level definitions in `filename`.
 *
 * @arg {string} filename
 * @return {Repl}
 */
module.exports = function (filename) {
  var r = repl.start({
    prompt: '> ',
    useGlobal: true
  });

  var load = function (filename) {
    loadFile(r, filename, function (err) {
      if (err) console.error(err.toString());
      r.displayPrompt();
    });
  };

  r.defineCommand('load', {
    help: 'Load JS file into this REPL',
    action: function (filenameToLoad) {
      load(filename = filenameToLoad);
    }
  });

  r.defineCommand('reload', Object.create(null, {
    help: {
      enumerable: true,
      get: function () {
        return 'Reload ' + filename;
      },
    },
    action: {
      enumerable: true,
      value: function () {
        load(filename);
      }
    }
  }));

  load(filename);

  return r;
};
