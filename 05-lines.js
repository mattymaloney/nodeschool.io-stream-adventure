var split = require("split");
var through = require("through");

var linenum = 0;

function write (buf) {
  linenum++;
  buf = buf.toString() + "\n";
  if (1 === linenum % 2) this.queue(buf.toLowerCase());
  else this.queue(buf.toUpperCase());
}

process.stdin.pipe(split()).pipe(through(write)).pipe(process.stdout);