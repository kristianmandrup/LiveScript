{spawn, exec} = require \child_process

# ANSI Terminal Colors.
bold  = '\33[0;1m'
red   = '\33[0;31m'
green = '\33[0;32m'
reset = '\33[0m'

tint = (text, color ? green) -> color + text + reset

# Run our node/livescript interpreter.
run = (args) ->
  proc = spawn \node [\lib/command] ++ args
  proc.stderr.on \data say
  proc       .on \exit -> process.exit it if it

# ES6
run-es6 = (args) ->
  console.log 'run-es6'
  proc = spawn \node ['--harmony' \lib/esg/command]
  proc.stderr.on \data say
  proc       .on \exit -> process.exit it if it

shell = (command) ->
  err, sout, serr <- exec command
  process.stdout.write sout if sout
  process.stderr.write serr if serr
  console.log err if err

slobber = (path, code) ->
  spit path, code
  say '* ' + path

minify = ->
  {parser, uglify} = require \uglify-js
  ast = parser.parse it
  ast = uglify.ast_mangle  ast
  ast = uglify.ast_squeeze ast
  uglify.gen_code ast


task \install 'install LiveScript via npm' -> shell 'npm install -g .'

task \build 'build lib/ from src/' ->
  ext = /\.ls$/
  sources = for file in dir \src
    \src/ + file if ext.test file
  run [\-bco \lib] ++ sources

# ES6
task \build-es6 'build lib/es6 from src/es6' ->
  ext = /\.ls$/
  sources = for file in dir \src/es6
    \src/es6/ + file if ext.test file
  run-es6 [\-bco \lib/es6] ++ sources

task \build:full 'build twice and run tests' ->
  shell 'bin/slake build && bin/slake build && bin/slake test'

# ES6
task \build-es6:full 'build twice and run tests' ->
  shell 'bin/slake build-es6 && bin/slake build-es6 && bin/slake test-es6'


task \build:parser 'build lib/parser.js from lib/grammar.js' ->
  spit \lib/parser.js,
    require(\./lib/grammar)generate!
      .replace /^[^]+?var (?=parser = {)/ \exports.
      .replace /\ncase \d+:\nbreak;/g ''
      .replace /return parser;[^]+/ ''
      .replace /(:[^]+?break;)(?=\ncase \d+\1)/g \:
      .replace /(:return .+)\nbreak;/g \$1

task \build-es6:parser 'build lib/es6/parser.js from lib/es6/grammar.js' ->
  spit \lib/es6/parser.js,
    require(\./lib/es6/grammar)generate!
      .replace /^[^]+?var (?=parser = {)/ \exports.
      .replace /\ncase \d+:\nbreak;/g ''
      .replace /return parser;[^]+/ ''
      .replace /(:[^]+?break;)(?=\ncase \d+\1)/g \:
      .replace /(:return .+)\nbreak;/g \$1

coreSources = -> ["src/#src.ls" for src in <[ livescript grammar lexer ast ]>]

task \bench 'quick benchmark in compilation time' ->
  LiveScript   = require './lib/'
  co     = coreSources!map(-> slurp it)join \\n
  fmt    = -> "#bold#{ "   #it"slice -4 }#reset ms"
  total  = nc = 0
  now    = Date.now!
  time   = -> total += ms = -(now - now := Date.now!); fmt ms
  tokens = LiveScript.lex co
  msg    = "Lex     #{time!} (#{tokens.length} tokens)\n"
  LiveScript.tokens.rewrite tokens
  msg   += "Rewrite #{time!} (#{tokens.length} tokens)\n"
  tree   = LiveScript.ast tokens
  msg   += "Parse   #{time!} (%s nodes)\n"
  js     = tree.compileRoot {+bare}
  msg   += "Compile #{time!} (#{js.length} chars)\n" +
           "TOTAL   #{ fmt total }"
  tree.traverseChildren (-> ++nc; void), true
  console.log msg, nc

task \loc 'count the lines in main compiler code' ->
  count = 0; line = /^[^\n\S]*[^#\s]/mg
  while line.test [code for code in coreSources!map -> slurp it] then ++count
  console.log count


task \test 'run test/' -> runTests require './lib/'

# ES6
task \test-es6 'run-es6 test/es6' -> runTestsEs6 require './lib/es6'

task \compile-es6 'compile-es6 test/es6' -> compileEs6 require './lib/es6'

task \transpile-es6 'transpile-es6 test/es6' -> transpileEs6 require './lib/es6'

task \test:json 'test JSON {de,}serialization' ->
  {ast} = require './lib'
  json = ast slurp \src/ast.ls .stringify!
  code = ast.parse json .compileRoot {+bare}
  exec 'diff -u lib/ast.js -' (e, out) -> say e || out.trim! || tint \ok
  .stdin.end code

function runTests global.LiveScript
  startTime = Date.now!
  passedTests = failedTests = 0
  for let name, func of require \assert
    global[name] = -> func ...; ++passedTests
  global <<<
    eq: strictEqual
    throws: !(msg, fun) ->
      try do fun catch then return eq e?message, msg
      ok false "should throw: #msg"
    compileThrows: !(msg, lno, code) ->
      throws "#msg on line #lno" !-> LiveScript.compile code
  process.on \exit ->
    time = ((Date.now! - startTime) / 1e3)toFixed 2
    message = "passed #passedTests tests in #time seconds"
    say if failedTests
    then tint "failed #failedTests and #message" red
    else tint message
    if failedTests
      process.exit 1
  
  files = dir \test
  unless '--harmony' in process.execArgv or '--harmony-generators' in process.execArgv
    say "Skipping --harmony tests"
    files.splice (files.indexOf 'generators.ls'), 1

  files.forEach (file) ->
    return unless /\.ls$/i.test file
    code = slurp filename = path.join \test file
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


# ES6 testing via Traceur

path = require 'path'

traceur-transpile file-path
  source      = fs.readFileSync filePath, 'utf8'

  traceur     = require 'node-traceur'
  reporter    = new traceur.util.MutedErrorReporter!
  source-file = new traceur.syntax.SourceFile file-path, source
  tree        = traceur.codegeneration.Compiler.compileFile reporter, source-file, file-path
  TreeWriter  = traceur.outputgeneration.TreeWriter
  javascript  = TreeWriter.write tree, false

  transpiled-filename = change-file-ext file-path, '-es5.js'
  write-file transpiled-filename, javascript

function change-file-ext file, ext
  path.basename(file) ++ ext

function write-file file, content
  spit 'writeFile', file, code ->
    console.log "error writing: #{file}" if(err)

function compileEs6 global.LiveScript
  files = dir \test/es6

  # console.log 'process args', process.execArgv
  unless '--harmony' in process.execArgv or '--harmony-generators' in process.execArgv
    say "Missing --harmony node option"
    return
  files = ['block_scoping.ls']

  files.forEach (file) ->
    return unless /\.ls$/i.test file
    code = slurp filename = path.join \test/es6 file
    LiveScript.run code, {filename}, ->
      # write code to js file
      js-filename = change-extension file, '.js'
      write-file js-filename, code
      # traceur-transpile js-filename

function transpileEs6 global.LiveScript
  compileEs6!
  files = dir \test/es6

  # console.log 'process args', process.execArgv
  unless '--harmony' in process.execArgv or '--harmony-generators' in process.execArgv
    say "Missing --harmony node option"
    return

  files = ['block_scoping.ls'] # hard coded to only run block_scoping test for now

  for each file in files
    js-filename = change-extension file, '.js'
    filename = path.join \test/es6 js-filename
    transpile-traceur filename

function runTestsEs6 global.LiveScript
  compileEs6!
  files = dir \test/es6

  # console.log 'process args', process.execArgv
  unless '--harmony' in process.execArgv or '--harmony-generators' in process.execArgv
    say "Missing --harmony node option"
    return

  files = ['block_scoping.ls'] # hard coded to only run block_scoping test for now

  for each file in files
    file-name = path.basename file
    code = slurp filename = path.join \test/es6 file-name '-es5' '.js'

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
