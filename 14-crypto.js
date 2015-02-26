/*jslint node:true plusplus:true  white:true */
'use strict';

var crypto = require("crypto");

var passphrase = process.argv[2];

var cryptoStream = crypto.createDecipher('aes256', passphrase);
process.stdin.pipe(cryptoStream).pipe(process.stdout);
