'use strict';

var nodei = require('..');

var test = require('tape'),
    concat = require('concat-stream'),
    through = require('through2'),
    mockfs = require('mock-fs');

var fs = require('fs');

var source0 = fs.readFileSync(__dirname + '/reload/source0.js');
var source1 = fs.readFileSync(__dirname + '/reload/source1.js');


test('reload', function (t) {
  mockfs({
    'index.js': source0
  });

  var repl = nodei('index.js', {
    prompt: '',
    input: through(),
    output: through()
  }).once('load', input)
    .on('exit', function () {
      repl.outputStream.end();
    });

  function input() {
    repl.inputStream.write('secret || ""\n');
    repl.inputStream.write('print()\n');

    fs.writeFileSync('index.js', source1);
    repl.inputStream.write('.reload\n');

    repl.once('load', function () {
      repl.inputStream.end('print()\n');
    });
  }

  repl.outputStream.pipe(concat({ encoding: 'string' }, function (output) {
    t.equal(output, "''\n'secret=null'\n'secret=secret'\n");
    t.end();

    mockfs.restore();
  }));
});
