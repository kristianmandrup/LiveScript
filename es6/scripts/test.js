// Generated by LiveScript 1.2.0
(function(){
  var LiveScript, slurp, spit, tweak, transpileEs6, bold, red, green, reset, tint;
  LiveScript = require('../lib');
  slurp = require('./base').slurp;
  spit = require('./base').spit;
  tweak = require('./base').tweak;
  transpileEs6 = require('./transpile');
  bold = '\x1b[0;1m';
  red = '\x1b[0;31m';
  green = '\x1b[0;32m';
  reset = '\x1b[0m';
  tint = function(text, color){
    color == null && (color = green);
    return color + text + reset;
  };
  function runTestsEs6(LiveScript){
    var startTime, passedTests, failedTests, i$, files;
    global.LiveScript = LiveScript;
    transpileEs6();
    startTime = Date.now();
    passedTests = failedTests = 0;
    for (i$ in require('assert')) {
      (fn$.call(this, i$, require('assert')[i$]));
    }
    global.eq = strictEqual;
    global.throws = function(msg, fun){
      var e;
      try {
        fun();
      } catch (e$) {
        e = e$;
        return eq(e != null ? e.message : void 8, msg);
      }
      ok(false, "should throw: " + msg);
    };
    global.compileThrows = function(msg, lno, code){
      throws(msg + " on line " + lno, function(){
        LiveScript.compile(code);
      });
    };
    process.on('exit', function(){
      var time, message;
      time = ((Date.now() - startTime) / 1e3).toFixed(2);
      message = "passed " + passedTests + " tests in " + time + " seconds";
      say(failedTests
        ? tint("failed " + failedTests + " and " + message, red)
        : tint(message));
      if (failedTests) {
        return process.exit(1);
      }
    });
    if (!(in$('--harmony', process.execArgv) || in$('--harmony-generators', process.execArgv))) {
      say("Missing --harmony node option");
      return;
    }
    files = ['block_scoping.ls'];
    return files.forEach(function(file){
      var fileName, code, filename, e, stk, msg, m, i$, ref$, len$, i, row, col, that, lines, line;
      fileName = path.basename(file);
      code = slurp(filename = path.join('es6/test', fileName('-es5', '.js')));
      try {
        return LiveScript.run(code, {
          filename: filename
        });
      } catch (e$) {
        e = e$;
        ++failedTests;
        if (!(stk = e != null ? e.stack : void 8)) {
          return say(e);
        }
        msg = e.message || '' + /^[^]+?(?=\n    at )/.exec(stk);
        if (m = /^(AssertionError:) "(.+)" (===) "(.+)"$/.exec(msg)) {
          for (i$ = 0, len$ = (ref$ = [2, 4]).length; i$ < len$; ++i$) {
            i = ref$[i$];
            m[i] = tint(m[i].replace(/\\n/g, '\n'), bold);
          }
          msg = m.slice(1).join('\n');
        }
        if ((ref$ = RegExp(filename + ':(\\d+):(\\d+)\\)?$', 'm').exec(stk)) != null) {
          row = ref$[1], col = ref$[2];
        }
        if (row && col) {
          say(tint(msg + "\n" + red + "at " + filename + ":" + row-- + ":" + col--, red));
          code = LiveScript.compile(code, {
            bare: true
          });
        } else if (that = /\bon line (\d+)\b/.exec(msg)) {
          say(tint(msg, red));
          row = that[1] - 1;
          col = 0;
        } else {
          return say(stk);
        }
        line = (lines = code.split('\n'))[row];
        lines[row] = line.slice(0, col) + tint(line.slice(col), bold);
        return say(lines.slice((ref$ = row - 8) > 0 ? ref$ : 0, row + 9).join('\n'));
      }
    });
    function fn$(name, func){
      global[name] = function(){
        func.apply(this, arguments);
        return ++passedTests;
      };
    }
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
