'use strict';

var nodei = require('..');

var test = require('tape'),
    concat = require('concat-stream'),
    through = require('through2');


test('globals', function (t) {
  (function test(subtests) {
    return subtests.length
      ? subtests.shift()(t, test.bind(null, subtests))
      : t.end();
  }([globals, fstest]));
});


function globals(t, end) {
  var repl = nodei({
    prompt: '',
    input: through(),
    output: through()
  }).on('exit', function () {
    repl.outputStream.end();
  });

  repl.inputStream.write(Object.keys(global)
                       .map(function (attr) {
                         return 'typeof ' + attr + '\n';
                       })
                       .join(''));

  repl.inputStream.end(Object.keys(require)
                       .map(function (attr) {
                         return 'typeof require.' + attr + '\n';
                       })
                       .join(''));

  var answers = [].concat(
    Object.keys(global)
      .map(function (attr) { return typeof global[attr]; }),
    Object.keys(require)
      .map(function (attr) { return typeof require[attr]; })
  );

  repl.outputStream.pipe(concat({ encoding: 'string' }, function (output) {
    t.equal(output,
            answers
            .map(function (type) {
              return "'" + type + "'\n";
            })
            .join(''),
            'should have access to globals');
    end();
  }));
}


function fstest(t, end) {
  var repl = nodei(__dirname + '/globals/index.js', {
    prompt: '',
    input: through(),
    output: through()
  }).once('load', function () {
    repl.inputStream.end('echo\n');
  }).on('exit', function () {
    repl.outputStream.end();
  });

  repl.outputStream.pipe(concat({ encoding: 'string' }, function (output) {
    t.equal(output, "'echo'\n", 'should pass fs + __dirname test');
    end();
  }));
}
