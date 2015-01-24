#!/usr/bin/env node
'use strict';

var nodei = require('./');

var parseArgs = require('minimist');


var usage = function () {
  console.log('Usage:  nodei <filename>');
  process.exit(1);
};

var argv = (function () {
  var argv = parseArgs(process.argv.slice(2), {
    unknown: function (arg) {
      if (arg[0] == '-') {
        usage();
      }
    }
  });

  if (argv._.length != 1) {
    return usage();
  }

  return argv;
}());


nodei(argv._[0]);
