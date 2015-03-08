'use strict';

var nodei = require('..');

var test = require('tape'),
    concat = require('concat-stream'),
    through = require('through2');


test('globals', function (t) {
  var repl = nodei({
    prompt: '',
    input: through(),
    output: through()
  }).on('exit', function () {
    repl.outputStream.end();
  });

  var attrs = ['console', 'Buffer', 'setTimeout',
               'clearTimeout', 'setInterval', 'clearInterval'];

  repl.inputStream.end(attrs
                       .map(function (attr) {
                         return 'typeof ' + attr + '\n';
                       })
                       .join(''));

  repl.outputStream.pipe(concat({ encoding: 'string' }, function (output) {
    t.equal(output,
            attrs
            .map(function (attr) {
              return "'" + typeof global[attr] + "'\n";
            })
            .join(''));
    t.end();
  }));
});
