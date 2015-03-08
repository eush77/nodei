'use strict';

var nodei = require('..');

var test = require('tape'),
    concat = require('concat-stream'),
    through = require('through2');


test('strict-mode', function (t) {
  var repl = nodei(__dirname + '/strict/index.js', {
    prompt: '',
    input: through(),
    output: through()
  }).once('load', function () {
    repl.inputStream.end('strict\n');
  }).on('exit', function () {
    repl.outputStream.end();
  });

  repl.outputStream.pipe(concat({ encoding: 'string' }, function (output) {
    t.equal(output, 'true\n');
    t.end();
  }));
});
