'use strict';

var nodei = require('..');

var test = require('tape'),
    through = require('through2'),
    devnull = require('dev-null');


test('basic API checks', function (t) {
  var repl = nodei(__dirname + '/basic/index.js', {
    input: through(),
    output: devnull()
  });
  repl.inputStream.end();

  t.ok(repl && repl.commands, 'is REPL');
  t.ok(repl.commands['.load'], 'has .load');
  t.ok(repl.commands['.reload'], 'has .reload');

  t.end();
});
