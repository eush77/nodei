#!/usr/bin/env node
'use strict';

var nodei = require('./');


var usage = function () {
  return 'Usage:  nodei [<filename>]';
};


process.exitCode = (function (argv) {
  switch (argv.length) {
    case 0:
      nodei();
      return 0;

    case 1:
      if (argv[0] == '--help') {
        console.log(usage());
      }
      else {
        nodei(argv[0]);
      }
      return 0;

    default:
      console.error(usage());
      return 1;
  }
}(process.argv.slice(2)));
