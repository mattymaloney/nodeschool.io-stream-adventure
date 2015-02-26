/*jslint node:true */
"use strict";

var httpRequest = require("request");
var url = "http://localhost:8000";

var postStream = httpRequest.post(url);
var sendStream = process.stdin.pipe(postStream);
var rcvStream = postStream.pipe(process.stdout);

/*
 * after the above operations, are postStream, sendStream and rcvStream 
 * all pointing to the same object? or copies of identical objects?
 */
