/*jslint node:true */
process.stdin.pipe(require("through")(function write (buf) {
  this.queue(buf.toString().toUpperCase());
})).pipe(process.stdout);