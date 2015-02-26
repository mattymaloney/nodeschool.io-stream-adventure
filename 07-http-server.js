/*jslint node:true */
"use strict";

var http = require("http");
var through = require("through");

var server = http.createServer(function (request, response) {
  if (request.method !== "POST") response.end();
  
  request.pipe(through(function (buf) {
    this.queue(buf.toString().toUpperCase());
  })).pipe(response);
});

server.timeout = 0;
server.listen(process.argv[2]);
