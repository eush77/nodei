'use strict';

var diff = require('object-diff'),
    pairs = require('object-pairs'),
    assign = Object.assign || require('object.assign'),
    resolveFrom = require('resolve-from');

var Repl = require('repl'),
    vm = require('vm'),
    fs = require('fs'),
    path = require('path');


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
 * @arg {string} filename
 * @return {Object}
 */
var makeSandbox = function (filename) {
  var dirname = path.dirname(filename);

  var sandbox = assign({}, global, {
    __filename: filename,
    __dirname: dirname,
    module: {},
    exports: {},
    require: function (module) {
      return require(resolveFrom(dirname, module));
    }
  });
  sandbox.global = sandbox;

  return sandbox;
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

    var sandbox = makeSandbox(filename);
    vm.runInNewContext(script, sandbox, filename);

    updateRepl(repl, sandbox);
    return cb(null);
  });
};


/**
 * Start the REPL and expose top-level definitions in `filename`.
 *
 * @arg {string} [filename]
 * @arg {object} [options] - Additional REPL options.
 * @return {Repl}
 */
module.exports = function (filename, options) {
  if (typeof filename == 'object') {
    options = filename;
    filename = null;
  }
  else {
    options = options || {};
  }

  var repl = Repl.start(assign({
    prompt: '> '
  }, options));

  var load = function (filename) {
    loadFile(repl, filename, function (err) {
      if (err) repl.outputStream.write(err.toString() + '\n');
      repl.displayPrompt();
      repl.emit('load', filename);
    });
  };

  repl.defineCommand('load', {
    help: 'Load JS file into this REPL',
    action: function (filenameToLoad) {
      load(filename = filenameToLoad);
    }
  });

  repl.defineCommand('reload', Object.create(null, {
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

  if (filename != null) {
    load(filename);
  }

  return repl;
};
