#!/usr/bin/env node

var lib = require('@google/maps');
var args = process.argv.slice(3);
var apiCall = lib.init()[process.argv[2]];

apiCall(lib.cli.parseArgs(args), lib.cli.callback);
