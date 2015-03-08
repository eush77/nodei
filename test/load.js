'use strict';

var nodei = require('..');

var test = require('tape'),
    concat = require('concat-stream'),
    through = require('through2');


test('load', function (t) {
  var repl = nodei({
    prompt: '',
    input: through(),
    output: through()
  }).on('exit', function () {
    repl.outputStream.end();
  });

  repl.inputStream.write('.load ' + __dirname + '/load/index.js\n');
  repl.once('load', function () {
    repl.inputStream.end('hello\n');
  });

  repl.outputStream.pipe(concat({ encoding: 'string' }, function (output) {
    t.equal(output, "'nice to meet you, too'\n");
    t.end();
  }));
});
