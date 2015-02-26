/*jslint node:true */
var concat = require("concat-stream");

function collector (buf) {
  function reverse(s) {
    var o = '';
    for (var i = s.length - 1; i >= 0; i--)
      o += s[i];
    return o;
  }
  buf = buf.toString();
  buf = reverse(buf);
  console.log(buf);
}

process.stdin.pipe(concat(collector));
//process.stdin.pipe(process.stdout);