'use strict';

var nodei = require('..');

var test = require('tape'),
    concat = require('concat-stream'),
    through = require('through2');


test('fs', function (t) {
  var repl = nodei(__dirname + '/fs/index.js', {
    prompt: '',
    input: through(),
    output: through()
  }).once('load', function () {
    repl.inputStream.end('echo\n');
  }).on('exit', function () {
    repl.outputStream.end();
  });

  repl.outputStream.pipe(concat({ encoding: 'string' }, function (output) {
    t.equal(output, "'echo'\n");
    t.end();
  }));
});
