/*jslint node:true */
"use strict";

var trumpet = require("trumpet")();
var through = require("through");
var fs = require("fs");

trumpet.selectAll(".loud", function (elem) {
  /*elem.createReadStream().pipe(through(function write (data) {
    this.queue(data.toString().toUpperCase());
  })).pipe(elem.createWriteStream());*/
  elem = elem.createStream();
  elem.pipe(through(function write (data) {
    this.queue(data.toString().toUpperCase());
  })).pipe(elem);
});

/*
 * experiment below operates on a second element from the 
 * same html source.
 * /
var p = trumpet.select("p").createStream()
p.pipe(through(function write (data) {
  this.queue("shmegger");
})).pipe(p);
/**/

process.stdin.pipe(trumpet).pipe(process.stdout);
