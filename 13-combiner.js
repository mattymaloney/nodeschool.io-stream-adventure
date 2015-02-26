/*jslint node:true plusplus:true  white:true */
'use strict';

var combiner = require("stream-combiner");
var split = require("split");
var through = require("through");
var zlib = require("zlib");

module.exports = function () {
  
  var genres = {};

  function splitIt () {
    return split();
  }

  function parseJSON () {
    
    var jsonObjs = [];
    
    function write (data) {
      if (!data) { return; }
      jsonObjs.push(JSON.parse(data.toString()));
    }
    function end () {
      this.queue(jsonObjs);
      this.queue(null);
    }
    return through(write, end);
  }

  function groupBooks () {
    var genres = [];
    var genre;
    function write (data) {
      data.forEach(function (line) {
        if (line.type === "genre") {
          genre = {
            name: line.name,
            books: []
          };
          genres.push(genre);
        }
        if (line.type === "book") { genre.books.push(line.name); }
      });
    }
    function end () {
      var what = this;
      genres.forEach(function (genre) {
        what.queue(JSON.stringify(genre) + "\n");
      });
      this.queue(null);
    }
    return through(write, end);
  }

  function gZipIt () {
    return zlib.createGzip();
  }

  return combiner(
    splitIt(),
    parseJSON(),
    groupBooks(),
    zlib.createGzip()
  );
};