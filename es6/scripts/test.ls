LiveScript  = require '../es6'
slurp       = require './base' .slurp
spit        = require './base' .spit
tweak       = require './base' .tweak

transpile-es6 = require './transpile'

# ANSI Terminal Colors.
bold  = '\33[0;1m'
red   = '\33[0;31m'
green = '\33[0;32m'
reset = '\33[0m'

tint = (text, color ? green) -> color + text + reset

function runTestsEs6 global.LiveScript
  transpile-es6!
  files = dir \es6/test

  # console.log 'process args', process.execArgv
  unless '--harmony' in process.execArgv or '--harmony-generators' in process.execArgv
    say "Missing --harmony node option"
    return

  files = ['block_scoping.ls'] # hard coded to only run block_scoping test for now

  for each file in files
    file-name = path.basename file
    code = slurp filename = path.join \es6/test file-name '-es5' '.js'

    try LiveScript.run code, {filename} catch
      ++failedTests
      return say e unless stk = e?stack
      msg = e.message or ''+ /^[^]+?(?=\n    at )/exec stk
      if m = /^(AssertionError:) "(.+)" (===) "(.+)"$/exec msg
        for i in [2 4] then m[i] = tint m[i]replace(/\\n/g \\n), bold
        msg  = m.slice(1)join \\n
      [, row, col]? = //#filename:(\d+):(\d+)\)?$//m.exec stk
      if row and col
        say tint "#msg\n#{red}at #filename:#{row--}:#{col--}" red
        code = LiveScript.compile code, {+bare}
      else if /\bon line (\d+)\b/exec msg
        say tint msg, red
        row = that.1 - 1
        col = 0
      else return say stk
      {(row): line} = lines = code.split \\n
      lines[row] = line.slice(0 col) + tint line.slice(col), bold
      say lines.slice(row-8 >? 0, row+9)join \\n