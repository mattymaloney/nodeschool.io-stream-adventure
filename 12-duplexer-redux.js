/*jslint node: true */
'use strict';

var duplexer = require("duplexer");
var through = require("through");


module.exports = function (counter) {
  var counts = {};

  function write (data) {
    counts[data.country] = counts[data.country] ? counts[data.country] += 1 : 1;
  }
  
  function end () {
    counter.setCounts(counts);
  }

  //var writer = counter.pipe(through(write, end));
  var writer = through(write, end);
    
  return duplexer(writer, counter);
};
