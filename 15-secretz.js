/*jslint node:true plusplus:true  white:true */
'use strict';

var zlib = require('zlib');
var through = require('through');
var crypto = require('crypto');
var tar = require('tar');

var cipher = process.argv[2];
var passphrase = process.argv[3];

var tarParser = tar.Parse()
tarParser.on('entry', function (entry) {

  var entryProcessor = through(function (data) {
    if (entry.type.toLowerCase() === 'file') {
      this.queue(data + ' ' + entry.path + '\n');
    } else {
    }
  });

  entry
    .pipe(crypto.createHash('md5', { encoding: 'hex' }))
    .pipe(entryProcessor)
    .pipe(process.stdout)
    ;
});

process.stdin
  .pipe(crypto.createDecipher(cipher, passphrase))
  .pipe(zlib.createGunzip())
  .pipe(tarParser)
  //.pipe(process.stdout)
  ;