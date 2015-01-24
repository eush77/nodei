'use strict';

var nodei = require('..');

var test = require('tape');


test('Basic API checks', function (t) {
  var repl = nodei(__dirname + '/../examples/foo.js');
  repl.inputStream.end();

  t.ok(repl && repl.commands, 'is REPL');
  t.ok(repl.commands['.load'], 'has .load');
  t.ok(repl.commands['.reload'], 'has .reload');

  t.end();
});
